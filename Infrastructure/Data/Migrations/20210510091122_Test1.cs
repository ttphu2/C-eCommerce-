using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Data.Migrations
{
    public partial class Test1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WishLists_AppUser_AppUserId",
                table: "WishLists");

            migrationBuilder.DropForeignKey(
                name: "FK_WishLists_Products_ProductId",
                table: "WishLists");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WishLists",
                table: "WishLists");

            migrationBuilder.RenameTable(
                name: "WishLists",
                newName: "AspNetUsers");

            migrationBuilder.RenameIndex(
                name: "IX_WishLists_ProductId",
                table: "AspNetUsers",
                newName: "IX_AspNetUsers_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_WishLists_AppUserId",
                table: "AspNetUsers",
                newName: "IX_AspNetUsers_AppUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AspNetUsers",
                table: "AspNetUsers",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AspNetUsers",
                table: "AspNetUsers");

            migrationBuilder.RenameTable(
                name: "AspNetUsers",
                newName: "WishLists");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUsers_ProductId",
                table: "WishLists",
                newName: "IX_WishLists_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUsers_AppUserId",
                table: "WishLists",
                newName: "IX_WishLists_AppUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WishLists",
                table: "WishLists",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WishLists_AppUser_AppUserId",
                table: "WishLists",
                column: "AppUserId",
                principalTable: "AppUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WishLists_Products_ProductId",
                table: "WishLists",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
