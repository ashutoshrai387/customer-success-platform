using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class updatedSprint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_Sprints_PhaseMilestones_PhaseMilestoneId",
            //    table: "Sprints");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_Sprints_Projects_ProjectId",
            //    table: "Sprints");

            //migrationBuilder.DropIndex(
            //    name: "IX_Sprints_PhaseMilestoneId",
            //    table: "Sprints");

            //migrationBuilder.DropColumn(
            //    name: "PhaseMilestoneId",
            //    table: "Sprints");

            //migrationBuilder.AlterColumn<Guid>(
            //    name: "ProjectId",
            //    table: "Sprints",
            //    type: "uuid",
            //    nullable: false,
            //    defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
            //    oldClrType: typeof(Guid),
            //    oldType: "uuid",
            //    oldNullable: true);

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Sprints_Projects_ProjectId",
            //    table: "Sprints",
            //    column: "ProjectId",
            //    principalTable: "Projects",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_Sprints_Projects_ProjectId",
            //    table: "Sprints");

            //migrationBuilder.AlterColumn<Guid>(
            //    name: "ProjectId",
            //    table: "Sprints",
            //    type: "uuid",
            //    nullable: true,
            //    oldClrType: typeof(Guid),
            //    oldType: "uuid");

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "Sprints",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Sprints_ProjectId",
                table: "Sprints",
                column: "ProjectId");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Sprints_PhaseMilestones_PhaseMilestoneId",
            //    table: "Sprints",
            //    column: "PhaseMilestoneId",
            //    principalTable: "PhaseMilestones",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sprints_Projects_ProjectId",
                table: "Sprints",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");
        }
    }
}
