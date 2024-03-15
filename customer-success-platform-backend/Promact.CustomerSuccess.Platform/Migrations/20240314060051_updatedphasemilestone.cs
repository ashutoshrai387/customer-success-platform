using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class updatedphasemilestone : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PhaseMilestones_Users_CreatorId",
                table: "PhaseMilestones");

            migrationBuilder.DropForeignKey(
                name: "FK_PhaseMilestones_Users_LastModifierId",
                table: "PhaseMilestones");

            migrationBuilder.DropIndex(
                name: "IX_PhaseMilestones_CreatorId",
                table: "PhaseMilestones");

            migrationBuilder.DropIndex(
                name: "IX_PhaseMilestones_LastModifierId",
                table: "PhaseMilestones");

            migrationBuilder.DropColumn(
                name: "ConcurrencyStamp",
                table: "PhaseMilestones");

            migrationBuilder.DropColumn(
                name: "ExtraProperties",
                table: "PhaseMilestones");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ConcurrencyStamp",
                table: "PhaseMilestones",
                type: "character varying(40)",
                maxLength: 40,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ExtraProperties",
                table: "PhaseMilestones",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_PhaseMilestones_CreatorId",
                table: "PhaseMilestones",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_PhaseMilestones_LastModifierId",
                table: "PhaseMilestones",
                column: "LastModifierId");

            migrationBuilder.AddForeignKey(
                name: "FK_PhaseMilestones_Users_CreatorId",
                table: "PhaseMilestones",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PhaseMilestones_Users_LastModifierId",
                table: "PhaseMilestones",
                column: "LastModifierId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
