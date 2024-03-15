using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class ForeignKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_DetailedTimelineReference_Projects_ProjectId",
            //    table: "DetailedTimelineReference");

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "VersionHistory",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "Stakeholders",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "Scope",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "ProjectUpdates",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "ProjectStack",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "DetailedTimelineReference",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "PhaseMilestoneId",
                table: "ApprovedTeam",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "ApprovedTeam",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_VersionHistory_ProjectId",
                table: "VersionHistory",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Stakeholders_ProjectId",
                table: "Stakeholders",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Scope_ProjectId",
                table: "Scope",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectUpdates_ProjectId",
                table: "ProjectUpdates",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectStack_ProjectId",
                table: "ProjectStack",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovedTeam_PhaseMilestoneId",
                table: "ApprovedTeam",
                column: "PhaseMilestoneId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovedTeam_ProjectId",
                table: "ApprovedTeam",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_ApprovedTeam_PhaseMilestones_PhaseMilestoneId",
                table: "ApprovedTeam",
                column: "PhaseMilestoneId",
                principalTable: "PhaseMilestones",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ApprovedTeam_Projects_ProjectId",
                table: "ApprovedTeam",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DetailedTimelineReference_Projects_ProjectId",
                table: "DetailedTimelineReference",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectStack_Projects_ProjectId",
                table: "ProjectStack",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectUpdates_Projects_ProjectId",
                table: "ProjectUpdates",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Scope_Projects_ProjectId",
                table: "Scope",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Stakeholders_Projects_ProjectId",
                table: "Stakeholders",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VersionHistory_Projects_ProjectId",
                table: "VersionHistory",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApprovedTeam_PhaseMilestones_PhaseMilestoneId",
                table: "ApprovedTeam");

            migrationBuilder.DropForeignKey(
                name: "FK_ApprovedTeam_Projects_ProjectId",
                table: "ApprovedTeam");

            migrationBuilder.DropForeignKey(
                name: "FK_DetailedTimelineReference_Projects_ProjectId",
                table: "DetailedTimelineReference");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectStack_Projects_ProjectId",
                table: "ProjectStack");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectUpdates_Projects_ProjectId",
                table: "ProjectUpdates");

            migrationBuilder.DropForeignKey(
                name: "FK_Scope_Projects_ProjectId",
                table: "Scope");

            migrationBuilder.DropForeignKey(
                name: "FK_Stakeholders_Projects_ProjectId",
                table: "Stakeholders");

            migrationBuilder.DropForeignKey(
                name: "FK_VersionHistory_Projects_ProjectId",
                table: "VersionHistory");

            migrationBuilder.DropIndex(
                name: "IX_VersionHistory_ProjectId",
                table: "VersionHistory");

            migrationBuilder.DropIndex(
                name: "IX_Stakeholders_ProjectId",
                table: "Stakeholders");

            migrationBuilder.DropIndex(
                name: "IX_Scope_ProjectId",
                table: "Scope");

            migrationBuilder.DropIndex(
                name: "IX_ProjectUpdates_ProjectId",
                table: "ProjectUpdates");

            migrationBuilder.DropIndex(
                name: "IX_ProjectStack_ProjectId",
                table: "ProjectStack");

            migrationBuilder.DropIndex(
                name: "IX_ApprovedTeam_PhaseMilestoneId",
                table: "ApprovedTeam");

            migrationBuilder.DropIndex(
                name: "IX_ApprovedTeam_ProjectId",
                table: "ApprovedTeam");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "VersionHistory");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Stakeholders");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Scope");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "ProjectUpdates");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "ProjectStack");

            migrationBuilder.DropColumn(
                name: "PhaseMilestoneId",
                table: "ApprovedTeam");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "ApprovedTeam");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProjectId",
                table: "DetailedTimelineReference",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddForeignKey(
                name: "FK_DetailedTimelineReference_Projects_ProjectId",
                table: "DetailedTimelineReference",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");
        }
    }
}
