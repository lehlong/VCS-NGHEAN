using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class tblBuAttachmenttblBuCheckInOutImagetblBuCheckInOutupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblBuAttachment",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Thumbnail = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Size = table.Column<double>(type: "float", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "varchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "varchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuAttachment", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblBuCheckInOut",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Vehicle = table.Column<string>(type: "varchar(50)", nullable: true),
                    CheckInTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CheckInConfirm = table.Column<string>(type: "varchar(50)", nullable: true),
                    CheckInNote = table.Column<string>(type: "varchar(255)", nullable: true),
                    CheckOutTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CheckOutConfirm = table.Column<string>(type: "varchar(50)", nullable: true),
                    CheckOutNote = table.Column<string>(type: "varchar(255)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "varchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "varchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuCheckInOut", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tblBuCheckInOutImage",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CheckInOutId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AttachmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Type = table.Column<string>(type: "varchar(50)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "varchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "varchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuCheckInOutImage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuCheckInOutImage_tblBuAttachment_AttachmentId",
                        column: x => x.AttachmentId,
                        principalTable: "tblBuAttachment",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblBuCheckInOutImage_tblBuCheckInOut_CheckInOutId",
                        column: x => x.CheckInOutId,
                        principalTable: "tblBuCheckInOut",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblBuCheckInOutImage_AttachmentId",
                table: "tblBuCheckInOutImage",
                column: "AttachmentId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblBuCheckInOutImage_CheckInOutId",
                table: "tblBuCheckInOutImage",
                column: "CheckInOutId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblBuCheckInOutImage");

            migrationBuilder.DropTable(
                name: "tblBuAttachment");

            migrationBuilder.DropTable(
                name: "tblBuCheckInOut");
        }
    }
}
