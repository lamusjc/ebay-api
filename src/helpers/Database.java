package helpers;

import java.sql.*;
import java.util.Properties;

public class Database {

    private Properties dataSource = null;
    private String driver = "org.postgresql.Driver";
    private Connection conn = null;
    public static final String JDBC_POSTGRESQL = "postgresql";
    public static final String HOST = "ec2-18-233-137-77.compute-1.amazonaws.com";
    public static final String USER_POSTGRESQL = "vrllckqjywkoza";
    public static final String PASS_POSTGRESQL = "58ee65085dcdc4c60256518cda2028feff864530343872aafbefacf541a9dab1";
    public static final String DB_POSTGRESQL = "d41qpsba1n3abu?sslmode=require";
    public static final int PORT_POSTGRESQL = 5432;

    // En caso de conectar usando los valores por default de las variables ya
    // pre-definidas
    public Database() {
        Properties dataSource = new Properties();
        dataSource.setProperty("jdbc", this.JDBC_POSTGRESQL);
        dataSource.setProperty("host", this.HOST);
        dataSource.setProperty("user", this.USER_POSTGRESQL);
        dataSource.setProperty("pass", this.PASS_POSTGRESQL);
        dataSource.setProperty("db", this.DB_POSTGRESQL);
        dataSource.setProperty("port", String.valueOf(this.PORT_POSTGRESQL));
        this.setDataSource(dataSource);
    }

    // En caso de conectar pasandole valores a este constructor
    public Database(String jdbc, String host, String user, String pass, String db, int port) {
        Properties dataSource = new Properties();
        dataSource.setProperty("jdbc", jdbc);
        dataSource.setProperty("host", host);
        dataSource.setProperty("user", user);
        dataSource.setProperty("pass", pass);
        dataSource.setProperty("db", db);
        dataSource.setProperty("port", String.valueOf(port));
        this.setDataSource(dataSource);
    }

    // Creamos el origen de base de datos.
    public void setDataSource(Properties dataSource) {
        if (!dataSource.getProperty("jdbc").isEmpty() && !dataSource.getProperty("host").isEmpty()
                && !dataSource.getProperty("user").isEmpty() && !dataSource.getProperty("pass").isEmpty()
                && !dataSource.getProperty("db").isEmpty() && !dataSource.getProperty("port").isEmpty()) {
            this.dataSource = dataSource;
            this.createConnection();
        } else {
            throw new Error("Error en la configuracion");
        }
    }

    // Crea la conexion
    private void createConnection() {
        try {
            Class.forName(this.driver);
            String connString = this.getConnString();
            this.conn = DriverManager.getConnection(connString, this.dataSource.getProperty("user"),
                    this.dataSource.getProperty("pass"));
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Obtener status de la conexion
    public boolean getConnectionStatus() {
        return this.conn != null;
    }

    public boolean execute(String query, Object... values) {
        if (this.getConnectionStatus()) {
            try {
                PreparedStatement pstmt = this.setValues(query, values);
                pstmt.execute();
                return true;
            } catch (SQLException e) {
                e.printStackTrace();
                return false;
            }
        } else {
            throw new Error("No hay conexion con la base de datos");
        }
    }

    public Object[][] executeQuery(String query, Object... values) {
        if (this.getConnectionStatus()) {
            ResultSet rs = null;
            try {
                PreparedStatement pstmt = this.setValues(query, values);
                rs = pstmt.executeQuery();
            } catch (SQLException e) {
                e.printStackTrace();
            }
            return this.RSToTable(rs);
        } else {
            throw new Error("No hay conexion con la base de datos");
        }
    }

    private String getConnString() {
        StringBuilder connString = new StringBuilder();
        connString.append("jdbc:").append(this.dataSource.getProperty("jdbc")).append("://")
                .append(this.dataSource.getProperty("host")).append(":").append(this.dataSource.getProperty("port"))
                .append("/").append(this.dataSource.getProperty("db"));

        return connString.toString();
    }

    private PreparedStatement setValues(String query, Object... values) {
        PreparedStatement pstmt = null;
        try {
            pstmt = this.conn.prepareStatement(query, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
            for (int i = 0; i < values.length; i++) {
                pstmt.setObject(i + 1, values[i]);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return pstmt;
    }

    // Transformar ResultSet a Tabla
    private Object[][] RSToTable(ResultSet rs) {
        Object table[][] = null;
        try {
            int numRows = 0;
            if (rs.last()) {
                numRows = rs.getRow();
                rs.beforeFirst();
            }

            ResultSetMetaData rsmd = rs.getMetaData();
            int numCols = rsmd.getColumnCount();

            table = new Object[numRows + 1][numCols];

            String[] labels = new String[numCols];

            for (int i = 0; i < numCols; i++) {
                labels[i] = rsmd.getColumnLabel(i + 1);
            }

            table[0] = labels;

            while (rs.next()) {
                int rowNum = rs.getRow();
                for (int i = 0; i < numCols; i++)
                    table[rowNum][i] = rs.getObject(i + 1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return table;
    }

    // Cerrar conexion
    public boolean close() {
        boolean isClosed = false;
        try {
            this.conn.close();

            isClosed = this.conn.isClosed();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return isClosed;

    }

}
