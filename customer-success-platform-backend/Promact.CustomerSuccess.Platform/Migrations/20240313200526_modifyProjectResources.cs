using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class modifyProjectResources : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AllocationPercentage",
                table: "ProjectResources");

            migrationBuilder.DropColumn(
                name: "Resource",
                table: "ProjectResources");

            migrationBuilder.DropColumn(
                name: "ResourceId",
                table: "ProjectResources");

            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "ProjectResources",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ResourceName",
                table: "ProjectResources",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comment",
                table: "ProjectResources");

            migrationBuilder.DropColumn(
                name: "ResourceName",
                table: "ProjectResources");

            migrationBuilder.AddColumn<double>(
                name: "AllocationPercentage",
                table: "ProjectResources",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<Guid>(
                name: "Resource",
                table: "ProjectResources",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "ResourceId",
                table: "ProjectResources",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }
    }
}
