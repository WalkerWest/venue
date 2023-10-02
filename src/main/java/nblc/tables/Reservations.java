package nblc.tables;

import io.hypersistence.tsid.TSID;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class Reservations implements DatabaseTable {

    private Connection conn;
    @Override public void setConnection(Connection conn) { this.conn = conn; }
    public Reservations(Connection conn) { this.setConnection(conn); }

    @Override
    public boolean isExistingTable() {
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM reservations");
            /*
            while (rs.next()) {
                String logstr = String.format("%s\t%d",
                        rs.getString("name"),
                        rs.getInt("seatQty"));
                logger.trace(logstr);
            }
            */
            return true;
        } catch (SQLException se) {
            if(se.getMessage().equals("Table/View 'RESERVATIONS' does not exist."))
                return false;
        }
        return true;
    }

    @Override
    public void createTable() {
        try {
            Statement stmt = conn.createStatement();
            stmt.executeUpdate(
                    "Create table reservations " +
                            "(id bigint primary key, name varchar(256), seatQty int)");
            // insert 2 rows
            stmt.executeUpdate("insert into reservations values ("+
                    (long) 99 +
                    ",'TESTY, TEST E.',2)");
        } catch (SQLException se) { }
    }

    @Override
    public List<String> outputTable() {
        List<String> retList = new ArrayList<String>();
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM reservations");

            // print out query result
            while (rs.next()) {
                String logstr = String.format("%d --> %s --> %d",
                        rs.getLong("id"),
                        rs.getString("name"),
                        rs.getInt("seatQty"));
                retList.add(logstr);
            }
        } catch (SQLException se) { }
        return retList;
    }

}
