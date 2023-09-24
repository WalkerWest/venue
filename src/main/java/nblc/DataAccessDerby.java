package nblc;

import com.google.inject.Singleton;
import io.hypersistence.tsid.TSID;
import org.apache.commons.compress.archivers.tar.TarArchiveEntry;
import org.apache.commons.compress.archivers.tar.TarArchiveInputStream;
import org.apache.commons.compress.compressors.gzip.GzipCompressorInputStream;
import org.apache.commons.compress.utils.IOUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.*;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

@Singleton
public class DataAccessDerby implements DataAccess {

    @Override
    public List<Reservation> getReservations() {
        List<Reservation> myList = new ArrayList<Reservation>();
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM reservations");
            while (rs.next()) {
                myList.add(new Reservation(
                        rs.getString("name"),
                        rs.getInt("seatQty")
                ));
                String logstr = String.format("%s\t%d",
                        rs.getString("name"),
                        rs.getInt("seatQty"));
                logger.trace(logstr);
            }
        } catch (SQLException se) { }
        return myList;
    }

    @Override
    public void createReservation(Reservation r) {
        try {
            Statement stmt = conn.createStatement();
            /*
            stmt.executeUpdate("insert into reservations values ("+
                    TSID.fast().toLong()+
                    ",'HORNER, JESS',4)");
            */
            String sql="insert into reservations " +
                    "(id, name, seatQty) values (" + TSID.fast().toLong() +
                    ",'" + r.name + "'," + r.seatQty + ")";
            stmt.executeUpdate(sql);
        } catch (SQLException se) { }
        return;
    }

    private static Logger logger = LogManager.getLogger(App.class);

    private Properties prop=new Properties();
    private String dbLoc = null;
    private String gDriveFolder = null;
    private String dbPath = null;
    Connection conn;

    public DataAccessDerby() throws IOException, SQLException {
        logger.info("The start dir is "+System.getProperty("user.dir"));
        try {
            FileInputStream ip= new FileInputStream(
                    System.getProperty("user.dir")+"/tea.properties");
            prop.load(ip);
            dbLoc = prop.getProperty("dbLoc");
            gDriveFolder = prop.getProperty("gDriveFolder");
            logger.info("User has requested the database to be stored at: "+
                    dbLoc);
            logger.info("User has database to be persisted at: "+
                    gDriveFolder);
        }
        catch (FileNotFoundException fnfe) {
            logger.info("No tea.properties file found.");
        }
        dbPath = null;
        if (dbLoc != null) dbPath = dbLoc;
        else {
            dbPath = App.class.getClassLoader().getResource("./derby").
                    getPath();
            dbPath = URLDecoder.decode(dbPath, "UTF-8");
            dbPath+="/attendees";
        }
        try {
            downloadDb();
        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        }

        //DriveQuickstart.DeleteDb();
        connectionToDerby();
        normalDbUsage();

    }

    public void connectionToDerby()
            throws SQLException, UnsupportedEncodingException {
        // -------------------------------------------
        // URL format is
        // jdbc:derby:<local directory to save data>
        // -------------------------------------------
        logger.info("Derby's path is: "+dbPath);
        String dbUrl = "jdbc:derby:"+dbPath+";create=true";

        logger.info("Derby's URL is: "+dbUrl);
        boolean databaseConnected=false;
        while(!databaseConnected) {
            logger.info("Attempting database connection...");
            try {
                conn = DriverManager.getConnection(dbUrl);
                databaseConnected=true;
            } catch (Exception ex) {
                if(ex.getMessage().contains("Failed to start database")) {
                    try { Thread.sleep(1000); }
                    catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                }
                else throw ex;
            }
        }
    }

    public void normalDbUsage() throws SQLException
    {
	boolean needsUploading = false;
        Statement stmt = conn.createStatement();
        try {
            ResultSet rs = stmt.executeQuery("SELECT * FROM users");
            /*
            while (rs.next()) {
                String logstr = String.format("%d\t%s",
                        rs.getInt("id"),
                        rs.getString("name"));
                logger.trace(logstr);
            }
            */
        } catch (SQLException se) {
            needsUploading = true;
            if(se.getMessage().equals("Table/View 'USERS' does not exist.")) {
                logger.info("Database must be created ...");

                // drop table
                // stmt.executeUpdate("Drop Table users");

                // create table
                stmt.executeUpdate(
                        "Create table users " +
                                "(id int primary key, name varchar(30))");

                // insert 2 rows
                stmt.executeUpdate("insert into users values (1,'tom')");
                stmt.executeUpdate("insert into users values (2,'peter')");

                // query
                ResultSet rs = stmt.executeQuery("SELECT * FROM users");

                // print out query result
                while (rs.next()) {
                    String logstr = String.format("%d --> %s --> %d", rs.getLong("id"),
                            rs.getString("name"), rs.getInt("seatQty"));
                    logger.trace(logstr);
                }
            }
        }
        stmt = conn.createStatement();
        try {
            ResultSet rs = stmt.executeQuery("SELECT * FROM reservations");
            while (rs.next()) {
                String logstr = String.format("%s\t%d",
                        rs.getString("name"),
                        rs.getInt("seatQty"));
                logger.trace(logstr);
            }
        } catch (SQLException se) {
            // needsUploading = true;
            if(se.getMessage().equals("Table/View 'RESERVATIONS' does not exist.")) {
                logger.info("Table must be created ...");

                // drop table
                // stmt.executeUpdate("Drop Table users");

                // create table
                stmt.executeUpdate(
                        "Create table reservations " +
                                "(id bigint primary key, name varchar(256), seatQty int)");

                // insert 2 rows
                stmt.executeUpdate("insert into reservations values ("+
				TSID.fast().toLong()+
				",'HORNER, JESS',4)");
                stmt.executeUpdate("insert into reservations values ("+
				TSID.fast().toLong()+
				",'REIDFORD, SHARRON',3)");
                stmt.executeUpdate("insert into reservations values ("+
				TSID.fast().toLong()+
				",'WEST, JUDITH',2)");

                // query
                ResultSet rs = stmt.executeQuery("SELECT * FROM reservations");

                // print out query result
                while (rs.next()) {
                    String logstr = String.format("%d --> %s --> %d", rs.getLong("id"),
                            rs.getString("name"), rs.getInt("seatQty"));
                    logger.trace(logstr);
                }
            }
        }
        if(needsUploading) uploadDb();
    }

    public void uploadDb() {
        try {
            //String tarFileName = source.getFileName().toString() + ".tar.gz";
            Files.walkFileTree(Paths.get(dbPath),
                    new MyFileVisitor(dbPath, dbPath+".tar.gz"));
            logger.info("The tarball database backup file is: "+
                    dbPath+".tar.gz");
            String fileId = DriveQuickstart.Upload(dbPath+".tar.gz",prop);
            if(fileId!=null) logger.info("The archive file id is "+fileId);
        }
        catch (Exception ex) {
            logger.error(ex.getMessage());
            for (StackTraceElement e : ex.getStackTrace())
                logger.error(e);
        }
    }

    public void downloadDb() throws GeneralSecurityException, IOException {
        ByteArrayOutputStream fileId = DriveQuickstart.Download();
        if(fileId!=null) {
            logger.info("Successfully downloaded attendees.tar.gz!");
            logger.info("Writing downloaded database to "+dbPath+".tar.gz");
            OutputStream os = new FileOutputStream(dbPath+".tar.gz");
            fileId.writeTo(os);
            fileId.close();
            os.close();
            TarArchiveInputStream tarIn = new TarArchiveInputStream(
                    new GzipCompressorInputStream(
                            new BufferedInputStream(
                                    new FileInputStream(dbPath+".tar.gz"))));
            TarArchiveEntry tarEntry = tarIn.getNextTarEntry();
            while(tarEntry!=null) {
                File file = new File(dbLoc+
                        System.getProperty("file.separator")+tarEntry.getName());
                logger.trace("Working: " + file);
                String dir = file.toPath().toString().substring(0,
                        file.toPath().toString().lastIndexOf(
                                System.getProperty("file.separator")));
                Files.createDirectories(new File(dir).toPath());
                IOUtils.copy(tarIn,new FileOutputStream(file));
                tarEntry = tarIn.getNextTarEntry();
            }
            tarIn.close();
        }
        else {
            logger.error("File attendees.tgz does not exist on Google Drive!");
        }
    }

}
