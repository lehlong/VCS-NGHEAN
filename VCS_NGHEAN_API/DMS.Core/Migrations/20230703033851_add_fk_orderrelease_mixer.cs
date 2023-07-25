using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class add_fk_orderrelease_mixer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrderRelease_MixerCode",
                table: "tblSoOrderRelease",
                column: "MixerCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrderRelease_tblMdMixer_MixerCode",
                table: "tblSoOrderRelease",
                column: "MixerCode",
                principalTable: "tblMdMixer",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrderRelease_tblMdMixer_MixerCode",
                table: "tblSoOrderRelease");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrderRelease_MixerCode",
                table: "tblSoOrderRelease");
        }
    }
}
