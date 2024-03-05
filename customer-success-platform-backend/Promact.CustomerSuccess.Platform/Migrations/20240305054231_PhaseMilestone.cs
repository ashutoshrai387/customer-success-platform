using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class PhaseMilestone : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PhaseMilestones_Projects_ProjectId1",
                table: "PhaseMilestones");

            migrationBuilder.DropIndex(
                name: "IX_PhaseMilestones_ProjectId1",
                table: "PhaseMilestones");

            migrationBuilder.DropColumn(
                name: "Comments",
                table: "PhaseMilestones");

            migrationBuilder.DropColumn(
                name: "ProjectId1",
                table: "PhaseMilestones");

            migrationBuilder.AddColumn<DateTime>(
                name: "ApprovalDate",
                table: "PhaseMilestones",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "RevisedEndDate",
                table: "PhaseMilestones",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApprovalDate",
                table: "PhaseMilestones");

            migrationBuilder.DropColumn(
                name: "RevisedEndDate",
                table: "PhaseMilestones");

            migrationBuilder.AddColumn<string>(
                name: "Comments",
                table: "PhaseMilestones",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId1",
                table: "PhaseMilestones",
                type: "uuid",
                nullable: true);

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
    }
}
