import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { users } from "../test-data/users";

test.describe("Cart", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test("user can add product to cart", async () => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await expect(inventoryPage.cartBadge).toHaveText("1");
  });

  test("user can remove product from cart", async () => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.openCart();
    await cartPage.removeProduct("Sauce Labs Backpack");
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });
});