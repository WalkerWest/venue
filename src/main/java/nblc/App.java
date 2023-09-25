package nblc;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Properties;

import com.google.inject.Guice;
import com.google.inject.Inject;

import com.google.inject.Injector;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;
import org.eclipse.jetty.util.log.Log;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.server.handler.HandlerCollection;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.util.log.Slf4jLog;

import org.glassfish.jersey.servlet.ServletContainer;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import org.slf4j.bridge.SLF4JBridgeHandler;

import javax.annotation.PreDestroy;

public class App
{
    private DataAccess da;

    @Inject
    public void setDataAccess(DataAccess da) { this.da=da; }

    private static Logger logger = LogManager.getLogger(App.class);

	public static Server server = new Server(8080);

    public static void main( String[] args ) throws Exception {
        logger.info("---------------------< nblc:tea >---------------------");
		logger.info("Starting now ...");
		Log.setLog(new Slf4jLog());

		SLF4JBridgeHandler.removeHandlersForRootLogger();
		SLF4JBridgeHandler.install();

		// Setup context for static content
		//Server server = new Server(8080);
		server.setDumpAfterStart(false);
		String webDir = App.class.getProtectionDomain().
				getCodeSource().getLocation().toExternalForm();
		logger.info("The webDir is: "+webDir);
		WebAppContext webAppContext = new WebAppContext(webDir,"/");

		// Setup for RESTful calls
		ServletContextHandler ctx =
				new ServletContextHandler(ServletContextHandler.NO_SESSIONS);
		ctx.setContextPath("/rest");
		// ctx.setClassLoader(Thread.currentThread().getContextClassLoader());

		HandlerCollection handlerCollection = new HandlerCollection();
		handlerCollection.setHandlers(new Handler[] {ctx, webAppContext});
		server.setHandler(handlerCollection);

		ServletHolder serHol = ctx.addServlet(ServletContainer.class, "/*");
		serHol.setInitOrder(1);
		serHol.setInitParameter("jersey.config.server.provider.packages",
			"nblc.rest");
		serHol.setInitParameter("javax.ws.rs.Application",
				"nblc.Config");
		serHol.setInitParameter("java.util.logging.manager",
				"org.apache.logging.log4j.jul.LogManager");

		// Load static content from the top level directory.
		URL webAppDir = App.class.getClassLoader().getResource("./www");
		if (webAppDir!=null)
			webAppContext.setResourceBase(webAppDir.toURI().toString());
		else {
			webAppContext.setInitParameter(
					"org.eclipse.jetty.servlet.Default.dirAllowed","false");
		}

		// Start the server!
		server.start();
		logger.info("Server started!");
		logger.info("Serving from: "+webAppContext.getResourceBase());

		new App();

		// Keep the main thread alive while the server is running.
		server.join();
    }

    public App() {
		Thread shutdownListener = new Thread(){
			public void run() {
				logger.warn("Shutdown signal received!");
				try {
					server.stop();
				} catch (Exception e) {
					throw new RuntimeException(e);
				}
				logger.warn("Server stopped.");

				logger.info("The start dir is "+System.getProperty("user.dir"));

				String dbPath = null;
				Properties prop=new Properties();
				String dbLoc = null;
				String gDriveFolder = null;

				try {
					FileInputStream ip= new FileInputStream(
							System.getProperty("user.dir")+"/tea.properties");
					try {
						prop.load(ip);
					} catch (IOException e) {
						throw new RuntimeException(e);
					}
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
				if (dbLoc != null) dbPath = dbLoc;
				else {
					dbPath = App.class.getClassLoader().getResource("./derby").
							getPath();
					try {
						dbPath = URLDecoder.decode(dbPath, "UTF-8");
					} catch (UnsupportedEncodingException e) {
						throw new RuntimeException(e);
					}
					dbPath+="/attendees";
				}

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

				/*
				Injector injector = Guice.createInjector(new AppModule());
				DataAccess da2 = injector.getInstance(DataAccess.class);
				((DataAccessDerby) da2).close();
				((DataAccessDerby) da2).uploadDb();
				*/
			}
		};
		Runtime.getRuntime().addShutdownHook(shutdownListener);
	}

}
