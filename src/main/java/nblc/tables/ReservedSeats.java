package nblc.tables;

import io.hypersistence.tsid.TSID;
import nblc.App;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class ReservedSeats implements DatabaseTable {

    private Connection conn;

    private static Logger logger = LogManager.getLogger(App.class);

    @Override public void setConnection(Connection conn) { this.conn = conn; }
    public ReservedSeats(Connection conn) { this.setConnection(conn); }

    @Override
    public boolean isExistingTable() {
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM reserved_seats");
            return true;
        } catch (SQLException se) {
            if(se.getMessage().equals("Table/View 'RESERVED_SEATS' does not exist."))
                return false;
        }
        return true;
    }

    @Override
    public void createTable() {
        try {
            Statement stmt = conn.createStatement();
            stmt.executeUpdate(
                    "Create table reserved_seats " +
                            "(reservationId bigint, seatId varchar(6), " +
                            " name varchar(256), mealEnum varchar(20), " +
                            "primary key (reservationId, seatId))");
            // insert 2 rows
            stmt.executeUpdate("insert into reserved_seats values ("+
                    (long) 99 + ",'S99-99','Mrs. Testy','CHICKEN')");
            stmt.executeUpdate("insert into reserved_seats values ("+
                    (long) 99 + ",'S99-98','Ms. Testy','FISH')");
        } catch (SQLException se) {
            logger.error(se.getMessage());
        }
    }

    @Override
    public List<String> outputTable() {
        List<String> retList = new ArrayList<String>();
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM reserved_seats");

            // print out query result
            while (rs.next()) {
                String logstr = String.format("%s --> %s",
                        rs.getString("seatId"),
                        rs.getString("name"));
                retList.add(logstr);
            }
        } catch (SQLException se) { }
        return retList;


    }
}
