package nblc;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.google.inject.Singleton;
import io.hypersistence.tsid.TSID;
import nblc.rest.MyMessage;
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
import org.javatuples.Pair;

import java.io.*;
import java.lang.reflect.Type;
import java.math.BigInteger;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;
import java.sql.*;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Singleton
public class DataAccessDerby implements DataAccess {

    @Override
    public List<Reservation> getReservations() {
        List<Reservation> myList = new ArrayList<Reservation>();
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT id, name, seatQty FROM reservations");
            while (rs.next()) {
                myList.add(new Reservation(
                        rs.getLong("id"),
                        rs.getString("name"),
                        rs.getInt("seatQty")
                ));
                String logstr = String.format("%s\t%d\t%d",
                        rs.getString("name"),
                        rs.getInt("seatQty"),
                        rs.getLong("id"));
            }
        } catch (SQLException se) {
            logger.error(se.getMessage());
        } catch (Exception e) {
            logger.error("Uncaught error",e);
        }
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
            conn.commit();
        } catch (SQLException se) {
            logger.error(se.getMessage());
        }
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
            conn.commit();
        } catch (SQLException se) {
            logger.error(se.getMessage());
        }
        return;
    }

    @Override
    public long createReservationTrans(Reservation r, List<Pair<Integer,ReservedSeat>> tableSeatPairs) {
        long resId = TSID.fast().toLong();
        boolean gotError=false;
        if(r.reservationId>0) resId = r.reservationId;
        try {
            PreparedStatement insert = conn.prepareStatement(
                    "insert into reservations (id, name, seatQty) values (?,?,?)"
            );
            insert.setLong(1,resId);
            insert.setString(2,r.name);
            insert.setInt(3,r.seatQty);
            insert.executeUpdate();
        } catch (SQLException se) {
            logger.error("INSERT Reservations ERROR: "+se.getMessage());
            gotError=true;
            resId=-1;
        }
        for(Pair<Integer,ReservedSeat> tsp : tableSeatPairs) {
            Integer tableNo = tsp.getValue0();
            ReservedSeat rs = tsp.getValue1();
            try {
                PreparedStatement check = conn.prepareStatement(
                    "select count (*) as seatCount from reserved_seats where seatId=?"
                );
                check.setString(1,"S" + tableNo + "-" + rs.seat.number);
                ResultSet checkResult = check.executeQuery();
                while (checkResult.next()) {
                    if(checkResult.getInt(1)>0) {
                        conn.rollback();
                        return -1;
                    }
                }
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
                logger.error("INSERT Reserved_Seats ERROR: "+se.getMessage());
                logger.error(se.getMessage());
                gotError=true;
                resId=-1;
            }
        }
        try { if(!gotError) conn.commit(); }
        catch (SQLException e) { logger.error(e.getMessage()); }
        return resId;
    }

    @Override
    public List<ReservedSeat> getReservedSeats(Reservation r) {
        List<ReservedSeat> myList = new ArrayList<ReservedSeat>();
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM reserved_seats " +
                    "WHERE reservationId="+r.reservationId+"");
            while (rs.next()) {
                Pattern pattern = Pattern.
                        compile("^S(?<table>[0-9]+)-(?<seat>[0-9]+)$");
                Matcher matcher = pattern.matcher(rs.getString("seatId"));
                if(matcher.find()) {
                    int table = Integer.parseInt(matcher.group("table"));
                    int seat = Integer.parseInt(matcher.group("seat"));
                    Seat mySeat = MyMessage.tables.get(table-1).seats[seat-1];
                    myList.add(new ReservedSeat(
                            r,
                            mySeat,
                            rs.getString("name"),
                            MealType.valueOf(rs.getString("mealEnum"))
                    ));
                }
            }
        } catch (SQLException se) {
            logger.error(se.getMessage());
        }
        return myList;
    }

    @Override
    public List<String> getReservedSeatIds(Reservation r) {
        List<String> myList = new ArrayList<String>();
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT seatId FROM reserved_seats " +
                    "WHERE reservationId="+r.reservationId+"");
            while (rs.next()) myList.add(rs.getString("seatId"));
        } catch (SQLException se) {
            logger.error(se.getMessage());
        }
        return myList;
    }

    @Override
    public void deleteReservation(long resId) {
        try {
            Statement stmt = conn.createStatement();
            int num=stmt.executeUpdate("DELETE FROM reserved_seats " +
                    "WHERE reservationId="+ BigInteger.valueOf(resId));
            num=stmt.executeUpdate("DELETE FROM reservations " +
                    "WHERE id="+BigInteger.valueOf(resId));
            conn.commit();
        } catch (SQLException se) {
            logger.error(se.getMessage());
        }
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
            downloadDb(true);
        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        }

        //DriveQuickstart.DeleteDb();
        connectionToDerby();
        normalDbUsage();

        try {
            downloadDb(false);
        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        }


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
                conn.setAutoCommit(false);
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
            conn.commit();
            for(String line : users.outputTable()) logger.trace(line);
        }

        DatabaseTable reservations = new Reservations(conn);
        if(!reservations.isExistingTable()) {
            needsUploading=true;
            logger.info("Database table 'RESERVATIONS' must be created ...");
            reservations.createTable();
            conn.commit();
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
            conn.commit();
            for(String line : reservedSeats.outputTable()) logger.trace(line);
        }
        else {
            for(String line : reservedSeats.outputTable())
                logger.trace(line);
        }

        if(needsUploading) uploadDb();
    }

    private static final EnvironmentProperties env =
            new DefaultEnvironmentProperties();
    private static final String UPLOADDB =
            env.getEnvironmentProperties("uploaddb");

    public void uploadDb() {
        if(UPLOADDB.equals("0")) {
            logger.warn("Database upload is OFF!");
            return;
        }
        try {
            //String tarFileName = source.getFileName().toString() + ".tar.gz";
            Files.walkFileTree(Paths.get(dbPath),
                    new MyFileVisitor(dbPath, dbPath+".tar.gz"));
            logger.info("The tarball database backup file is: "+
                    dbPath+".tar.gz");
            String fileId = DriveQuickstart.Upload(dbPath+".tar.gz",prop.getProperty("gDriveFolder"));
            if(fileId!=null) logger.info("The archive file id is "+fileId);
        }
        catch (Exception ex) {
            logger.error(ex.getMessage());
            for (StackTraceElement e : ex.getStackTrace())
                logger.error(e);
        }
    }

    public void downloadDb(boolean isDownloadDb) throws GeneralSecurityException, IOException {
        HashMap<String,ByteArrayOutputStream> fileMap = DriveQuickstart.Download(isDownloadDb);
        if(fileMap!=null) {
            boolean foundTgz=false;
            for(Map.Entry<String,ByteArrayOutputStream> fileEntry : fileMap.entrySet()) {
                if(fileEntry.getKey().equals("attendees.tar.gz") && isDownloadDb) {
                    if(UPLOADDB.equals("0")) {
                        logger.warn("Database upload is OFF!");
                    }
                    foundTgz=true;
                    logger.info("Successfully downloaded attendees.tar.gz!");
                    logger.info("Writing downloaded database to "+dbPath+".tar.gz");
                    OutputStream os = new FileOutputStream(dbPath+".tar.gz");
                    fileEntry.getValue().writeTo(os);
                    fileEntry.getValue().close();
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
                } else if (!isDownloadDb && fileEntry.getKey().toLowerCase().contains("json")) {
                    logger.info("Successfully downloaded "+fileEntry.getKey()+"!");
                    logger.info("Writing downloaded JSON file to /tmp/"+fileEntry.getKey());
                    OutputStream os = new FileOutputStream("/tmp/"+fileEntry.getKey());
                    fileEntry.getValue().writeTo(os);
                    fileEntry.getValue().close();
                    os.close();

                    InputStreamReader reader = new InputStreamReader(
                            new FileInputStream("/tmp/"+fileEntry.getKey()),"UTF-8");
                    BufferedReader bufRead = new BufferedReader(reader);
                    Gson gson = new Gson();
                    String myLine = bufRead.readLine();
                    Reservation r = gson.fromJson(myLine,Reservation.class);
                    //Type pairType = new TypeToken<Pair<Integer,ReservedSeat>>(){}.getType();

                    Type listType = new TypeToken<ArrayList<Pair<Integer,ReservedSeat>>>(){}.getType();
                    List<Pair<Integer,ReservedSeat>> resList = gson.fromJson(bufRead.readLine(),listType);

                    if(!checkReservation(r.reservationId)) {
                        long returnCode = this.createReservationTrans(r,resList);
                        if(returnCode==-1) {
                            logger.error("The Reservation could not be created from "+
                                    fileEntry.getKey()+"; consider removing file from Google Drive");
                            //DriveQuickstart.DeleteDb(fileEntry.getKey());
                        }
                    } else if (UPLOADDB.equals("1")) {
                        DriveQuickstart.DeleteDb(fileEntry.getKey());
                    }
                    bufRead.close();
                    reader.close();
                    File jsonFile = new File("/tmp/"+fileEntry.getKey());
                    jsonFile.delete();
                }
            }
            if(!foundTgz && isDownloadDb) logger.error("File attendees.tgz does not exist on Google Drive!");
        }
        else {
            if(isDownloadDb) logger.error("File attendees.tgz does not exist on Google Drive!");
        }
    }

    private boolean checkReservation(Long resId) {
        boolean isExisting = false;
        try {
            PreparedStatement check = conn.prepareStatement(
                    "select count (*) as resCount from reservations where id=?"
            );
            check.setLong(1,resId);
            ResultSet checkResult = check.executeQuery();
            while (checkResult.next()) {
                if(checkResult.getInt(1)>0) {
                    return true;
                }
            }
        } catch (SQLException se) {
            logger.error(se.getMessage());
        } catch (Exception e) {
            logger.error("Uncaught error",e);
        }
        return false;
    }

    public void close() {
        try {
            conn.close();
        } catch (SQLException e) { }
    }

}
