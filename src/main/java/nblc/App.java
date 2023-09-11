package nblc;

import java.io.*;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLDecoder;

import com.google.api.services.drive.Drive;
import org.apache.commons.compress.archivers.tar.TarArchiveEntry;
import org.apache.commons.compress.archivers.tar.TarArchiveInputStream;
import org.apache.commons.compress.archivers.tar.TarArchiveOutputStream;
import org.apache.commons.compress.compressors.gzip.GzipCompressorInputStream;
import org.apache.commons.compress.compressors.gzip.GzipCompressorOutputStream;
import org.apache.commons.compress.utils.IOUtils;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.DefaultHandler;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.webapp.WebAppContext;
import org.eclipse.jetty.util.log.Log;

import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.security.GeneralSecurityException;
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

    public static void main( String[] args ) throws Exception {
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
			webAppContext.setInitParameter("org.eclipse.jetty.servlet.Default.dirAllowed","false");
			// webAppContext.getServletHandler().getServletMapping("/www").setDefault(true);
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

		//DriveQuickstart.DeleteDb();

		App app = new App();

		try {
			app.downloadDb();
		} catch (GeneralSecurityException|IOException e) {
			throw new RuntimeException(e);
		}

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
		dbPath = null;
		if (dbLoc != null) dbPath = dbLoc;
		else {
			dbPath = App.class.getClassLoader().getResource("./derby").getPath();
			dbPath = URLDecoder.decode(dbPath, "UTF-8");
			dbPath+="/attendees";
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
					catch (InterruptedException e) { throw new RuntimeException(e); }
				}
				else throw ex;
			}
		}
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
			uploadDb();
		}
    }

	public void uploadDb() {
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
				File file = new File(dbLoc+System.getProperty("file.separator")+tarEntry.getName());
				logger.trace("Working: " + file);
				String dir = file.toPath().toString().substring(0,
						file.toPath().toString().lastIndexOf(System.getProperty("file.separator")));
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
