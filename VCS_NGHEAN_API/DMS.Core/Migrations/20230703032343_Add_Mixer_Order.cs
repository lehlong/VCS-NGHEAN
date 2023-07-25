using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class Add_Mixer_Order : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "MixerCode",
                table: "tblSoOrder",
                type: "varchar(50)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblSoOrder_MixerCode",
                table: "tblSoOrder",
                column: "MixerCode");

            migrationBuilder.AddForeignKey(
                name: "FK_tblSoOrder_tblMdMixer_MixerCode",
                table: "tblSoOrder",
                column: "MixerCode",
                principalTable: "tblMdMixer",
                principalColumn: "Code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblSoOrder_tblMdMixer_MixerCode",
                table: "tblSoOrder");

            migrationBuilder.DropIndex(
                name: "IX_tblSoOrder_MixerCode",
                table: "tblSoOrder");

            migrationBuilder.AlterColumn<string>(
                name: "MixerCode",
                table: "tblSoOrder",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldNullable: true);
        }
    }
}
