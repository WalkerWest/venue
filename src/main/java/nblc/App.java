package nblc;

import java.net.URL;

import com.google.inject.Inject;

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

public class App
{
	private DataAccess da;
	@Inject
	public void setDataAccess(DataAccess da) {
		this.da=da;
	}
    private static Logger logger = LogManager.getLogger(App.class);

    public static void main( String[] args ) throws Exception {
        logger.info("---------------------< nblc:tea >---------------------");
		logger.info("Starting now ...");
		Log.setLog(new Slf4jLog());

		SLF4JBridgeHandler.removeHandlersForRootLogger();
		SLF4JBridgeHandler.install();

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

		// Keep the main thread alive while the server is running.
		server.join();
    }

    public App() {	}

}
