using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class update_tblSoScale : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OrderReleaseCode",
                table: "tblSoScale",
                type: "varchar(50)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "PercentageOfImpurities",
                table: "tblMdItem",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Proportion",
                table: "tblMdItem",
                type: "float",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblSoScale_OrderReleaseCode",
                table: "tblSoScale",
                column: "OrderReleaseCode",
                unique: true,
                filter: "[OrderReleaseCode] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoScale_tblSoOrderRelease_OrderReleaseCode",
                table: "tblSoScale",
                column: "OrderReleaseCode",
                principalTable: "tblSoOrderRelease",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoScale_tblSoOrderRelease_OrderReleaseCode",
                table: "tblSoScale");

            migrationBuilder.DropIndex(
                name: "IX_tblSoScale_OrderReleaseCode",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "OrderReleaseCode",
                table: "tblSoScale");

            migrationBuilder.DropColumn(
                name: "PercentageOfImpurities",
                table: "tblMdItem");

            migrationBuilder.DropColumn(
                name: "Proportion",
                table: "tblMdItem");
        }
    }
}
