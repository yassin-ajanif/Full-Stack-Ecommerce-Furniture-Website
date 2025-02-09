using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class Removing_OrderID_From_CartTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
          
            migrationBuilder.DropIndex(
                   name: "IX_Carts_OrderID",
                   table: "Carts");

            // Drop the OrderID column
            migrationBuilder.DropColumn(
                name: "OrderID",
                table: "Carts");

          
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
