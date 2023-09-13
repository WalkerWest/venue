package nblc;

import com.google.inject.Guice;
import com.google.inject.Injector;
import org.glassfish.hk2.api.ServiceLocator;
import org.glassfish.hk2.utilities.ServiceLocatorUtilities;
import org.glassfish.jersey.logging.LoggingFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.jvnet.hk2.guice.bridge.api.GuiceBridge;
import org.jvnet.hk2.guice.bridge.api.GuiceIntoHK2Bridge;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.ws.rs.ApplicationPath;
import java.util.logging.Level;
import java.util.logging.Logger;

@ApplicationPath("/")
public class Config extends ResourceConfig {

    @Inject
    public Config(ServiceLocator serviceLocator) {
        ServiceLocatorUtilities.enableImmediateScope(serviceLocator);
        packages("nblc.rest");
        Injector injector = Guice.createInjector(new AppModule());
        initGuiceIntoHK2Bridge(serviceLocator, injector);
        register(new LoggingFeature(Logger.getLogger(LoggingFeature.DEFAULT_LOGGER_NAME),
                Level.INFO, LoggingFeature.Verbosity.PAYLOAD_ANY, 10000));
    }

    private void initGuiceIntoHK2Bridge(
            ServiceLocator serviceLocator, Injector injector) {
        GuiceBridge.getGuiceBridge().initializeGuiceBridge(serviceLocator);
        GuiceIntoHK2Bridge guiceBridge =
                serviceLocator.getService(GuiceIntoHK2Bridge.class);
        guiceBridge.bridgeGuiceInjector(injector);
    }

}
