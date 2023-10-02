package nblc;

import com.google.inject.Singleton;
import io.hypersistence.tsid.TSID;
import nblc.tables.DatabaseTable;
import nblc.tables.Reservations;
import nblc.tables.ReservedSeats;
import nblc.tables.Users;
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
                // logger.trace(logstr);
            }
        } catch (SQLException se) { }
        return myList;
    }

    @Override
    public long createReservation(Reservation r) {
        long myId = TSID.fast().toLong();
        try {
            Statement stmt = conn.createStatement();
            String sql="insert into reservations " +
                    "(id, name, seatQty) values (" + myId +
                    ",'" + r.name + "'," + r.seatQty + ")";
            stmt.executeUpdate(sql);
        } catch (SQLException se) { }
        return myId;
    }

    @Override
    public void createReservedSeat(long resId, int tableNo, ReservedSeat rs) {
        try {
            PreparedStatement stmt = conn.prepareStatement(
                    "insert into reserved_seats " +
                            "(reservationId, seatId, name, mealEnum) " +
                            "values (?,?,?,?)");
            stmt.setLong(1,resId);
            stmt.setString(2,"S" + tableNo + "-" + rs.seat.number);
            stmt.setString(3,rs.person);
            stmt.setString(4,rs.meal.toString());
            stmt.executeUpdate();
        } catch (SQLException se) {
            logger.error(se.getMessage());
        }
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
                    ex.getStackTrace();
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

        DatabaseTable users = new Users(conn);
        if(!users.isExistingTable()) {
            needsUploading=true;
            logger.info("Database table 'USERS' must be created ...");
            users.createTable();
            for(String line : users.outputTable()) logger.trace(line);
        }

        DatabaseTable reservations = new Reservations(conn);
        if(!reservations.isExistingTable()) {
            needsUploading=true;
            logger.info("Database table 'RESERVATIONS' must be created ...");
            reservations.createTable();
            for(String line : reservations.outputTable()) logger.trace(line);
        }
        else {
            for(String line : reservations.outputTable())
                logger.trace(line);
        }

        DatabaseTable reservedSeats = new ReservedSeats(conn);
        if(!reservedSeats.isExistingTable()) {
            needsUploading=true;
            logger.info("Database table 'RESERVED_SEATS' must be created ...");
            reservedSeats.createTable();
            for(String line : reservedSeats.outputTable()) logger.trace(line);
        }
        else {
            for(String line : reservedSeats.outputTable())
                logger.trace(line);
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

    public void close() {
        try {
            conn.close();
        } catch (SQLException e) { }
    }

}
