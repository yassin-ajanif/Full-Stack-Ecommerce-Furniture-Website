using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class addingforeignKeyUserIdfororderandcarttables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
             migrationBuilder.AddForeignKey(
               name: "FK_Carts_AspNetUsers_UserID",
               table: "Carts",
               column: "UserID",
               principalTable: "AspNetUsers",
               principalColumn: "Id",
               onDelete: ReferentialAction.Restrict);

           migrationBuilder.AddForeignKey(
               name: "FK_Orders_AspNetUsers_UserID",
               table: "Orders",
               column: "UserID",
               principalTable: "AspNetUsers",
               principalColumn: "Id",
               onDelete: ReferentialAction.Restrict);

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
             migrationBuilder.DropForeignKey(
                name: "FK_Carts_AspNetUsers_UserID",
                table: "Carts");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_UserID",
                table: "Orders");
        }
    }
}
