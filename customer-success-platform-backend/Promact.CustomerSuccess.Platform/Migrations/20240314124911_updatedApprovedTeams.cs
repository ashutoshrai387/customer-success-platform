using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class updatedApprovedTeams : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_ApprovedTeam_PhaseMilestones_PhaseMilestoneId",
            //    table: "ApprovedTeam");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_ApprovedTeam_Projects_ProjectId",
            //    table: "ApprovedTeam");

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "ApprovedTeam",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            //migrationBuilder.AlterColumn<Guid>(
            //    name: "PhaseMilestoneId",
            //    table: "ApprovedTeam",
            //    type: "uuid",
            //    nullable: true,
            //    oldClrType: typeof(Guid),
            //    oldType: "uuid");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_ApprovedTeam_PhaseMilestones_PhaseMilestoneId",
            //    table: "ApprovedTeam",
            //    column: "PhaseMilestoneId",
            //    principalTable: "PhaseMilestones",
            //    principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ApprovedTeam_Projects_ProjectId",
                table: "ApprovedTeam",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_ApprovedTeam_PhaseMilestones_PhaseMilestoneId",
            //    table: "ApprovedTeam");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_ApprovedTeam_Projects_ProjectId",
            //    table: "ApprovedTeam");

            //migrationBuilder.AlterColumn<Guid>(
            //    name: "ProjectId",
            //    table: "ApprovedTeam",
            //    type: "uuid",
            //    nullable: true,
            //    oldClrType: typeof(Guid),
            //    oldType: "uuid");

            //migrationBuilder.AlterColumn<Guid>(
            //    name: "PhaseMilestoneId",
            //    table: "ApprovedTeam",
            //    type: "uuid",
            //    nullable: false,
            //    defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
            //    oldClrType: typeof(Guid),
            //    oldType: "uuid",
            //    oldNullable: true);

            //migrationBuilder.AddForeignKey(
            //    name: "FK_ApprovedTeam_PhaseMilestones_PhaseMilestoneId",
            //    table: "ApprovedTeam",
            //    column: "PhaseMilestoneId",
            //    principalTable: "PhaseMilestones",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Cascade);

            //migrationBuilder.AddForeignKey(
            //    name: "FK_ApprovedTeam_Projects_ProjectId",
            //    table: "ApprovedTeam",
            //    column: "ProjectId",
            //    principalTable: "Projects",
            //    principalColumn: "Id");
        }
    }
}
