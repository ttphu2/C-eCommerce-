using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Data.Migrations
{
    public partial class WishListV3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WishList_AppUser_AppUserId",
                table: "WishList");

            migrationBuilder.DropForeignKey(
                name: "FK_WishList_Products_ProductId",
                table: "WishList");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WishList",
                table: "WishList");

            migrationBuilder.RenameTable(
                name: "WishList",
                newName: "WishLists");

            migrationBuilder.RenameIndex(
                name: "IX_WishList_ProductId",
                table: "WishLists",
                newName: "IX_WishLists_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_WishList_AppUserId",
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

        protected override void Down(MigrationBuilder migrationBuilder)
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
                newName: "WishList");

            migrationBuilder.RenameIndex(
                name: "IX_WishLists_ProductId",
                table: "WishList",
                newName: "IX_WishList_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_WishLists_AppUserId",
                table: "WishList",
                newName: "IX_WishList_AppUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WishList",
                table: "WishList",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WishList_AppUser_AppUserId",
                table: "WishList",
                column: "AppUserId",
                principalTable: "AppUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WishList_Products_ProductId",
                table: "WishList",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
