using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class updatedStakeholdes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropColumn(
            //    name: "CreationTime",
            //    table: "Stakeholders");

            //migrationBuilder.DropColumn(
            //    name: "CreatorId",
            //    table: "Stakeholders");

            //migrationBuilder.DropColumn(
            //    name: "LastModificationTime",
            //    table: "Stakeholders");

            //migrationBuilder.DropColumn(
            //    name: "LastModifierId",
            //    table: "Stakeholders");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.AddColumn<DateTime>(
            //    name: "CreationTime",
            //    table: "Stakeholders",
            //    type: "timestamp without time zone",
            //    nullable: false,
            //    defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            //migrationBuilder.AddColumn<Guid>(
            //    name: "CreatorId",
            //    table: "Stakeholders",
            //    type: "uuid",
            //    nullable: true);

            //migrationBuilder.AddColumn<DateTime>(
            //    name: "LastModificationTime",
            //    table: "Stakeholders",
            //    type: "timestamp without time zone",
            //    nullable: true);

            //migrationBuilder.AddColumn<Guid>(
            //    name: "LastModifierId",
            //    table: "Stakeholders",
            //    type: "uuid",
            //    nullable: true);
        }
    }
}
