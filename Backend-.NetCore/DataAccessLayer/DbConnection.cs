using Microsoft.Data.SqlClient;

namespace DataAccessLayer
{
    public static class DbConnection
    {
        public const string sqlConStr = """
                                      
                 Server=DESKTOP-SE7VLTJ\SQLEXPRESS;
                                      
                 Database=EcommerceDb;
                                      
                 Trusted_Connection=True;
                                      
                 TrustServerCertificate=True
                                      
                 """;

    }
}
