using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class adding_constructors_to_Objects_were_lacking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Orders_orderID",
                table: "Payments");

            migrationBuilder.RenameColumn(
                name: "orderID",
                table: "Payments",
                newName: "OrderID");

            migrationBuilder.RenameIndex(
                name: "IX_Payments_orderID",
                table: "Payments",
                newName: "IX_Payments_OrderID");

            migrationBuilder.AlterColumn<string>(
                name: "PasswordHashed",
                table: "Users",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Orders_OrderID",
                table: "Payments",
                column: "OrderID",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Orders_OrderID",
                table: "Payments");

            migrationBuilder.RenameColumn(
                name: "OrderID",
                table: "Payments",
                newName: "orderID");

            migrationBuilder.RenameIndex(
                name: "IX_Payments_OrderID",
                table: "Payments",
                newName: "IX_Payments_orderID");

            migrationBuilder.AlterColumn<string>(
                name: "PasswordHashed",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Orders_orderID",
                table: "Payments",
                column: "orderID",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
