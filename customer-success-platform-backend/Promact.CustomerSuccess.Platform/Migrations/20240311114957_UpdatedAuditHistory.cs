using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedAuditHistory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "AuditHistory",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_AuditHistory_ProjectId",
                table: "AuditHistory",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_AuditHistory_Projects_ProjectId",
                table: "AuditHistory",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AuditHistory_Projects_ProjectId",
                table: "AuditHistory");

            migrationBuilder.DropIndex(
                name: "IX_AuditHistory_ProjectId",
                table: "AuditHistory");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "AuditHistory");
        }
    }
}
