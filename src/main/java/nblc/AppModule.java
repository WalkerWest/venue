package nblc;

import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import com.google.inject.Singleton;

import java.io.IOException;
import java.sql.SQLException;

public class AppModule extends AbstractModule {

    @Provides
    @Singleton
    DataAccess getDataAccessResource() throws SQLException, IOException {
        DataAccessDerby dad = new DataAccessDerby();
        return dad;
    }

}
