package nblc.tables;

import io.hypersistence.tsid.TSID;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

public class ReservedSeats implements DatabaseTable {

    private Connection conn;
    @Override public void setConnection(Connection conn) { this.conn = conn; }
    public ReservedSeats(Connection conn) { this.setConnection(conn); }

    @Override
    public boolean isExistingTable() {
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM reserved_seats");
            return true;
        } catch (SQLException se) {
            if(se.getMessage().equals("Table/View does not exist."))
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
                            " name varchar(256), mealEnum varchar(20)) " +
                            "primary key (reservationId, seatId)");
            // insert 2 rows
            stmt.executeUpdate("insert into reserved_seats values ("+
                    (long) 99 + ",'S99-99','Mrs. Testy','CHICKEN')");
            stmt.executeUpdate("insert into reserved_seats values ("+
                    (long) 99 + ",'S99-98','Ms. Testy','FISH')");
        } catch (SQLException se) { }
    }

    @Override
    public List<String> outputTable() {
        return null;
    }
}
