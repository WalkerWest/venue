package nblc;

import java.io.*;
import java.net.URL;
import java.net.URLDecoder;

import org.apache.commons.compress.archivers.tar.TarArchiveEntry;
import org.apache.commons.compress.archivers.tar.TarArchiveOutputStream;
import org.apache.commons.compress.compressors.gzip.GzipCompressorOutputStream;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.DefaultHandler;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.webapp.WebAppContext;
import org.eclipse.jetty.util.log.Log;

import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import java.util.Properties;

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

import javax.servlet.SessionTrackingMode;


public class App 
{

    private static Logger logger = LogManager.getLogger(App.class);

    public static void main( String[] args ) throws Exception
    {
        logger.info("------------------------------< nblc:tea >------------------------------");
		logger.info("Starting now ...");
		Log.setLog(new Slf4jLog());

		Server server = new Server(8080);
		server.setDumpAfterStart(false);
		String webDir = App.class.getProtectionDomain().
				getCodeSource().getLocation().toExternalForm();
		logger.info("The webDir is: "+webDir);
		WebAppContext webAppContext = new WebAppContext(webDir,"/");

		// Setup for RESTful calls
		ServletContextHandler ctx =
				new ServletContextHandler(ServletContextHandler.NO_SESSIONS);
		ctx.setContextPath("/rest");

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
		else {
			// webAppContext.setInitParameter("org.eclipse.jetty.servlet.Default.dirAllowed","false");
			webAppContext.getServletHandler().getServletMapping("/www").setDefault(true);
			/*
			ResourceHandler rh = new ResourceHandler();
			rh.setDirectoriesListed(false);
			rh.setWelcomeFiles(new String[]{"index.html"});
			rh.setResourceBase("./www");
			HandlerList handlers = new HandlerList();
			handlers.setHandlers(new Handler[] { rh, new DefaultHandler()});
			server.setHandler(handlers);
			*/
		}

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

	public Properties prop;

    public App() throws Exception {
		prop = new Properties();
		// FileInputStream ip= new FileInputStream(System.getProperty("user.dir");
		logger.info("The start dir is "+System.getProperty("user.dir"));
		try {
			FileInputStream ip= new FileInputStream(System.getProperty("user.dir")+"/tea.properties");
			prop.load(ip);
			dbLoc = prop.getProperty("dbLoc");
			gDriveFolder = prop.getProperty("gDriveFolder");
			logger.info("User has requested the database to be stored at: "+dbLoc);
			logger.info("User has database to be persisted at: "+gDriveFolder);
		}
		catch (FileNotFoundException fnfe) {
			logger.info("No tea.properties file found.");
		}
    }

    Connection conn;
    String dbLoc = null;
	String dbPath = null;

	String gDriveFolder = null;

    public void connectionToDerby() throws SQLException, UnsupportedEncodingException {
        // -------------------------------------------
        // URL format is
        // jdbc:derby:<local directory to save data>
        // -------------------------------------------
		dbPath = null;
		if (dbLoc != null) dbPath = dbLoc;
		else {
			dbPath = App.class.getClassLoader().getResource("./derby").getPath();
			dbPath = URLDecoder.decode(dbPath, "UTF-8");
			dbPath+="/attendees";
		}
		logger.info("Derby's path is: "+dbPath);
			String dbUrl = "jdbc:derby:"+dbPath+";create=true";
		try {
			//String tarFileName = source.getFileName().toString() + ".tar.gz";
			Files.walkFileTree(Paths.get(dbPath),new MyFileVisitor(dbPath, dbPath+".tar.gz"));
			logger.info("The tarball database backup file is: "+dbPath+".tar.gz");
			String fileId = DriveQuickstart.Upload(dbPath+".tar.gz",prop);
			if(fileId!=null) logger.info("The archive file id is "+fileId);
		}
		catch (Exception ex) {
			logger.error(ex.getMessage());
			for (StackTraceElement e : ex.getStackTrace())
				logger.error(e);
		}
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
						String logstr = String.format("%d\t%s", rs.getInt("id"),
								rs.getString("name"));
								logger.trace(logstr);
					}
			}
		}
    }
}
