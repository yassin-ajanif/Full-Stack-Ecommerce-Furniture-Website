using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class TestToRemoveColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
      name: "FK_Products_Carts_CartID",
      table: "Products");

            // Remove the index on the column
            migrationBuilder.DropIndex(
                name: "IX_Products_CartID",
                table: "Products");

            // Drop the column
            migrationBuilder.DropColumn(
                name: "CartId",
                table: "Products");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Carts_CartId",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "CartId",
                table: "Products",
                newName: "CartID");

            migrationBuilder.RenameIndex(
                name: "IX_Products_CartId",
                table: "Products",
                newName: "IX_Products_CartID");

            migrationBuilder.AlterColumn<int>(
                name: "CartID",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Carts_CartID",
                table: "Products",
                column: "CartID",
                principalTable: "Carts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
