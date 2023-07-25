using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_fk_export_order : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_tblSoOrder_ExportCode",
                table: "tblSoOrder");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_ExportCode",
                table: "tblSoOrder",
                column: "ExportCode",
                unique: true,
                filter: "[ExportCode] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_tblSoOrder_ExportCode",
                table: "tblSoOrder");

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_ExportCode",
                table: "tblSoOrder",
                column: "ExportCode");
        }
    }
}
