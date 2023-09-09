package nblc;

import java.net.URL;
import java.net.URLDecoder;
import java.io.UnsupportedEncodingException;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;
import org.eclipse.jetty.util.log.Log;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import java.util.Properties;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.glassfish.jersey.servlet.ServletContainer;
import org.eclipse.jetty.server.handler.HandlerCollection;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.util.log.Log;
import org.eclipse.jetty.util.log.Slf4jLog;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.core.config.Configurator;


public class App 
{

    private static Logger logger = LogManager.getLogger(App.class);

    public static void main( String[] args ) throws Exception
    {
        logger.info("------------------------------< nblc:tea >------------------------------");
	logger.info("Starting now ...");
	Log.setLog(new Slf4jLog());
	//Log.setLog(logger);
	//Configurator.setLevel("org.eclipse.jetty.server.session", Level.OFF);
        // Create a server that listens on port 8080.
	Server server = new Server(8080);
	server.setDumpAfterStart(false);
	String webDir = App.class.getProtectionDomain().
			getCodeSource().getLocation().toExternalForm();
	WebAppContext webAppContext = new WebAppContext(webDir,"/");
	//webAppContext.setContextPath("/");
	//server.setHandler(webAppContext);

	// Setup for RESTful calls
	ServletContextHandler ctx = 
            new ServletContextHandler(ServletContextHandler.NO_SESSIONS);
	ctx.setContextPath("/rest");
        //server.setHandler(ctx);

        HandlerCollection handlerCollection = new HandlerCollection();
        handlerCollection.setHandlers(new Handler[] {ctx, webAppContext});
	server.setHandler(handlerCollection);

        ServletHolder serHol = ctx.addServlet(ServletContainer.class, "/*");
        serHol.setInitOrder(1);
        serHol.setInitParameter("jersey.config.server.provider.packages", 
            "nblc.rest");

	// Load static content from the top level directory.
	URL webAppDir = App.class.getClassLoader().getResource("./www");
	if (webAppDir!=null) webAppContext.setResourceBase(webAppDir.toURI().toString());

	// Start the server! 
	server.start();
	logger.info("Server started!");
	//logger.info("Serving from: "+webAppDir.toString());
	logger.info("Serving from: "+webAppContext.getResourceBase());

	App app = new App();
	app.connectionToDerby();
	app.normalDbUsage();

	// Keep the main thread alive while the server is running.
	server.join();
    }

    public App() throws Exception {
	Properties prop = new Properties();
	// FileInputStream ip= new FileInputStream(System.getProperty("user.dir”);
	logger.info("The start dir is "+System.getProperty("user.dir"));
	try {
	    FileInputStream ip= new FileInputStream(System.getProperty("user.dir")+"/tea.properties");
	    prop.load(ip);
	    dbLoc = prop.getProperty("dbLoc");
	    logger.info("User has requested the database to be stored at "+dbLoc);
	}
	catch (FileNotFoundException fnfe) {
	    logger.info("No tea.properties file found.");
	}
    }

    Connection conn;
    String dbLoc = null;

    public void connectionToDerby() throws SQLException, UnsupportedEncodingException {
        // -------------------------------------------
        // URL format is
        // jdbc:derby:<local directory to save data>
        // -------------------------------------------
	String dbPath = null;
	if (dbLoc != null) dbPath = dbLoc; 
	else {
	    dbPath = App.class.getClassLoader().getResource("./derby").getPath();
	    dbPath = URLDecoder.decode(dbPath, "UTF-8");
	    dbPath+="/attendees";
	}
	logger.info("Derby's path is: "+dbPath);
        String dbUrl = "jdbc:derby:"+dbPath+";create=true";
	logger.info("Derby's URL is: "+dbUrl);
        conn = DriverManager.getConnection(dbUrl);
    }

    public void normalDbUsage() throws SQLException 
    {
        Statement stmt = conn.createStatement();
	try {
            ResultSet rs = stmt.executeQuery("SELECT * FROM users");
            while (rs.next()) {
		String logstr = String.format("%d\t%s", rs.getInt("id"), rs.getString("name"));
                logger.trace(logstr);
            }
	} catch (SQLException se) {
	    if(se.getMessage().equals("Table/View 'USERS' does not exist.")) {
                logger.info("Database must be created ...");
            
                // drop table
                // stmt.executeUpdate("Drop Table users");
            
                // create table
                stmt.executeUpdate("Create table users (id int primary key, name varchar(30))");
            
                // insert 2 rows
                stmt.executeUpdate("insert into users values (1,'tom')");
                stmt.executeUpdate("insert into users values (2,'peter')");
            
                // query
                ResultSet rs = stmt.executeQuery("SELECT * FROM users");
            
                // print out query result
                while (rs.next()) {
		    String logstr = String.format("%d\t%s", rs.getInt("id"), rs.getString("name"));
                    logger.trace(logstr);
                }
	    }
	}
    }

}
