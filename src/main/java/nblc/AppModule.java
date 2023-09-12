package nblc;

import com.google.inject.AbstractModule;

public class AppModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(DataAccess.class).to(DataAccessDerby.class);
    }

}
