using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class Stakeholder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "VersionHistory",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "Sprints",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "Scope",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "ProjectStack",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "ProjectDescription",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "DetailedTimelineReference",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "AuditHistory",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Stakeholders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Contact = table.Column<string>(type: "text", nullable: false),
                    ProjectId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uuid", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    LastModifierId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stakeholders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stakeholders_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_VersionHistory_ProjectId",
                table: "VersionHistory",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Sprints_ProjectId",
                table: "Sprints",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Scope_ProjectId",
                table: "Scope",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectStack_ProjectId",
                table: "ProjectStack",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectDescription_ProjectId",
                table: "ProjectDescription",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_DetailedTimelineReference_ProjectId",
                table: "DetailedTimelineReference",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditHistory_ProjectId",
                table: "AuditHistory",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Stakeholders_ProjectId",
                table: "Stakeholders",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_AuditHistory_Projects_ProjectId",
                table: "AuditHistory",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DetailedTimelineReference_Projects_ProjectId",
                table: "DetailedTimelineReference",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectDescription_Projects_ProjectId",
                table: "ProjectDescription",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectStack_Projects_ProjectId",
                table: "ProjectStack",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Scope_Projects_ProjectId",
                table: "Scope",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Sprints_Projects_ProjectId",
                table: "Sprints",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_VersionHistory_Projects_ProjectId",
                table: "VersionHistory",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AuditHistory_Projects_ProjectId",
                table: "AuditHistory");

            migrationBuilder.DropForeignKey(
                name: "FK_DetailedTimelineReference_Projects_ProjectId",
                table: "DetailedTimelineReference");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectDescription_Projects_ProjectId",
                table: "ProjectDescription");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectStack_Projects_ProjectId",
                table: "ProjectStack");

            migrationBuilder.DropForeignKey(
                name: "FK_Scope_Projects_ProjectId",
                table: "Scope");

            migrationBuilder.DropForeignKey(
                name: "FK_Sprints_Projects_ProjectId",
                table: "Sprints");

            migrationBuilder.DropForeignKey(
                name: "FK_VersionHistory_Projects_ProjectId",
                table: "VersionHistory");

            migrationBuilder.DropTable(
                name: "Stakeholders");

            migrationBuilder.DropIndex(
                name: "IX_VersionHistory_ProjectId",
                table: "VersionHistory");

            migrationBuilder.DropIndex(
                name: "IX_Sprints_ProjectId",
                table: "Sprints");

            migrationBuilder.DropIndex(
                name: "IX_Scope_ProjectId",
                table: "Scope");

            migrationBuilder.DropIndex(
                name: "IX_ProjectStack_ProjectId",
                table: "ProjectStack");

            migrationBuilder.DropIndex(
                name: "IX_ProjectDescription_ProjectId",
                table: "ProjectDescription");

            migrationBuilder.DropIndex(
                name: "IX_DetailedTimelineReference_ProjectId",
                table: "DetailedTimelineReference");

            migrationBuilder.DropIndex(
                name: "IX_AuditHistory_ProjectId",
                table: "AuditHistory");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "VersionHistory");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Sprints");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Scope");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "ProjectStack");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "ProjectDescription");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "DetailedTimelineReference");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "AuditHistory");
        }
    }
}
