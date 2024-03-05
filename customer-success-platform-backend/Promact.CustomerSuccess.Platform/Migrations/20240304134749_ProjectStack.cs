using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class ProjectStack : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId1",
                table: "PhaseMilestones",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ProjectStack",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectStack", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PhaseMilestones_ProjectId1",
                table: "PhaseMilestones",
                column: "ProjectId1");

            migrationBuilder.AddForeignKey(
                name: "FK_PhaseMilestones_Projects_ProjectId1",
                table: "PhaseMilestones",
                column: "ProjectId1",
                principalTable: "Projects",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PhaseMilestones_Projects_ProjectId1",
                table: "PhaseMilestones");

            migrationBuilder.DropTable(
                name: "ProjectStack");

            migrationBuilder.DropIndex(
                name: "IX_PhaseMilestones_ProjectId1",
                table: "PhaseMilestones");

            migrationBuilder.DropColumn(
                name: "ProjectId1",
                table: "PhaseMilestones");
        }
    }
}
