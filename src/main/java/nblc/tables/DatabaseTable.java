package nblc.tables;

import java.sql.Connection;
import java.util.List;

public interface DatabaseTable {
    public void setConnection(Connection conn);
    public boolean isExistingTable();
    public void createTable();
    public List<String> outputTable();
}
