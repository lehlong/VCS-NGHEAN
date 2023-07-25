using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class Add_tblNotification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PortalId",
                table: "tblAdAccount",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "tblBuNotification",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Headings = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Subtitle = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Contents = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(MAX)", nullable: true),
                    Type = table.Column<int>(type: "int", nullable: true),
                    IsSeen = table.Column<bool>(type: "bit", nullable: true),
                    IsSent = table.Column<bool>(type: "bit", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "varchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "varchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    DeleteDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    DeleteBy = table.Column<string>(type: "varchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblBuNotification", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblBuNotification_tblAdAccount_UserName",
                        column: x => x.UserName,
                        principalTable: "tblAdAccount",
                        principalColumn: "UserName");
                });

            migrationBuilder.CreateTable(
                name: "tblMdNotificationTemplate",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TemplateCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    TemplateName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    SubTitle = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    Message = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    CreateBy = table.Column<string>(type: "varchar(50)", nullable: true),
                    UpdateBy = table.Column<string>(type: "varchar(50)", nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdateDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblMdNotificationTemplate", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblBuNotification_UserName",
                table: "tblBuNotification",
                column: "UserName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblBuNotification");

            migrationBuilder.DropTable(
                name: "tblMdNotificationTemplate");

            migrationBuilder.DropColumn(
                name: "PortalId",
                table: "tblAdAccount");
        }
    }
}
