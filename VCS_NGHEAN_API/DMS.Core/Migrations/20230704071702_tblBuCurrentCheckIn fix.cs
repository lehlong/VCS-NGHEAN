using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class tblBuCurrentCheckInfix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_tblBuCurrentCheckin",
                table: "tblBuCurrentCheckin");

            migrationBuilder.RenameTable(
                name: "tblBuCurrentCheckin",
                newName: "tblBuCurrentCheckIn");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblBuCurrentCheckIn",
                table: "tblBuCurrentCheckIn",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_tblBuCurrentCheckIn",
                table: "tblBuCurrentCheckIn");

            migrationBuilder.RenameTable(
                name: "tblBuCurrentCheckIn",
                newName: "tblBuCurrentCheckin");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblBuCurrentCheckin",
                table: "tblBuCurrentCheckin",
                column: "Id");
        }
    }
}
