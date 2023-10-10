package nblc;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import java.security.Security;
import java.util.Properties;

public class SendMailTls {
    private static Logger logger = LogManager.getLogger(App.class);
    private static final EnvironmentProperties env =
            new DefaultEnvironmentProperties();
    private static final String EMAIL_ADDR =
            env.getEnvironmentProperties("email.addr");
    private static final String EMAIL_USERID =
            env.getEnvironmentProperties("email.userid");
    private static final String EMAIL_PASSWD =
            env.getEnvironmentProperties("email.passwd");

    public static void send(String emailTo) {
        send(emailTo,null);
    }
    public static void send(String emailTo, Long confirmCode) {
        Security.addProvider(new com.sun.net.ssl.internal.ssl.Provider());
        final String SSL_FACTORY = "javax.net.ssl.SSLSocketFactory";

        Properties prop = new Properties();
        //prop.put("mail.smtp.host", "smtp.gmail.com");
        //prop.put("mail.smtp.port", "587");
        //prop.put("mail.smtp.auth", "true");
        //prop.put("mail.smtp.starttls.enable", "true");

        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "465");
        prop.put("mail.smtp.socketFactory.port", "465");
        prop.put("mail.smtp.socketFactory.class",
                "javax.net.ssl.SSLSocketFactory");
        prop.put("mail.smtp.auth", "true");

        int tryCount=0;
        while(tryCount<=3) {
            try {
                if(tryCount>0) {
                    logger.info("Trying email again...");
                    Thread.sleep(1000);
                }
                tryCount++;
                Session session = Session.getInstance(prop,
                        new Authenticator() {
                            protected PasswordAuthentication getPasswordAuthentication() {
                                return new PasswordAuthentication(EMAIL_USERID, EMAIL_PASSWD);
                            }
                        });
                Message message = new MimeMessage(session);
                message.setFrom(new InternetAddress(EMAIL_ADDR));
                message.setRecipients(
                        Message.RecipientType.TO,
                        InternetAddress.parse(emailTo)
                );
                if(confirmCode!=null) {
                    message.setSubject("NBLC Tea Registration Code");
                    message.setText("Dear Attendee,"
                            + "\n\n Your registration code is: "+confirmCode);
                } else {
                    message.setSubject("Testing Gmail TLS");
                    message.setText("Dear Mail Crawler,"
                            + "\n\n Please do not spam my email!");
                }

                Transport.send(message);
                logger.info("Done sending email!");

            } catch (MessagingException | InterruptedException e) {
                e.printStackTrace();
                throw new RuntimeException(e);
            }
            break;
        }
    }


}
