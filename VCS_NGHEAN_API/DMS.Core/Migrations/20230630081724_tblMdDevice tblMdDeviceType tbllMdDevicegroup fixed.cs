using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMS.CORE.Migrations
{
    /// <inheritdoc />
    public partial class tblMdDevicetblMdDeviceTypetbllMdDevicegroupfixed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblMdDeviceGroup",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", nullable: true),
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
                    table.PrimaryKey("PK_tblMdDeviceGroup", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdDeviceType",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", nullable: true),
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
                    table.PrimaryKey("PK_tblMdDeviceType", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "tblMdDevice",
                columns: table => new
                {
                    Code = table.Column<string>(type: "varchar(50)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    TypeCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    GroupCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    IpAddress = table.Column<string>(type: "varchar(50)", nullable: true),
                    IpPort = table.Column<int>(type: "int", nullable: false),
                    DevicePort = table.Column<int>(type: "int", nullable: false),
                    Username = table.Column<string>(type: "varchar(50)", nullable: true),
                    Password = table.Column<string>(type: "varchar(50)", nullable: true),
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
                    table.PrimaryKey("PK_tblMdDevice", x => x.Code);
                    table.ForeignKey(
                        name: "FK_tblMdDevice_tblMdDeviceGroup_GroupCode",
                        column: x => x.GroupCode,
                        principalTable: "tblMdDeviceGroup",
                        principalColumn: "Code");
                    table.ForeignKey(
                        name: "FK_tblMdDevice_tblMdDeviceType_TypeCode",
                        column: x => x.TypeCode,
                        principalTable: "tblMdDeviceType",
                        principalColumn: "Code");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblMdDevice_GroupCode",
                table: "tblMdDevice",
                column: "GroupCode");

            migrationBuilder.CreateIndex(
                name: "IX_tblMdDevice_TypeCode",
                table: "tblMdDevice",
                column: "TypeCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblMdDevice");

            migrationBuilder.DropTable(
                name: "tblMdDeviceGroup");

            migrationBuilder.DropTable(
                name: "tblMdDeviceType");
        }
    }
}
