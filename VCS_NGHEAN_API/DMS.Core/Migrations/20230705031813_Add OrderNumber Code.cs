using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderNumberCode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrder_tblSoExport_ExportCode",
                table: "tblSoOrder");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrder_ExportCode",
                table: "tblSoOrder");

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "tblSoScale",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "OrderNumber",
                table: "tblSoExportDetail",
                type: "float",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblSoExport_OrderCode",
                table: "tblSoExport",
                column: "OrderCode",
                unique: true,
                filter: "[OrderCode] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoExport_tblSoOrder_OrderCode",
                table: "tblSoExport",
                column: "OrderCode",
                principalTable: "tblSoOrder",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoExport_tblSoOrder_OrderCode",
                table: "tblSoExport");

            migrationBuilder.DropIndex(
                name: "IX_tblSoExport_OrderCode",
                table: "tblSoExport");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "OrderNumber",
                table: "tblSoExportDetail");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_ExportCode",
                table: "tblSoOrder",
                column: "ExportCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrder_tblSoExport_ExportCode",
                table: "tblSoOrder",
                column: "ExportCode",
                principalTable: "tblSoExport",
                principalColumn: "Code");
        }
    }
}
