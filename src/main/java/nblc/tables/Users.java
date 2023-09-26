package nblc.tables;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class Users implements DatabaseTable {

    private Connection conn;
    @Override public void setConnection(Connection conn) { this.conn = conn; }
    public Users(Connection conn) { this.setConnection(conn); }

    @Override
    public boolean isExistingTable() {
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM users");
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
                    "Create table users " +
                            "(id int primary key, name varchar(30))");

            // insert 2 rows
            stmt.executeUpdate("insert into users values (1,'tom')");
            stmt.executeUpdate("insert into users values (2,'peter')");
        } catch (SQLException se) { }
    }

    @Override
    public List<String> outputTable() {
        List<String> retList = new ArrayList<String>();
        try {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM users");

            // print out query result
            while (rs.next()) {
                String logstr = String.format("%d\t%s", rs.getInt("id"),
                        rs.getString("name"));
                retList.add(logstr);
            }
        } catch (SQLException se) { }
        return retList;
    }
}
