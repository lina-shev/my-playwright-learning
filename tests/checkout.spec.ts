import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { users } from "../test-data/users";

test.describe("Checkout", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test("user can complete checkout", async () => {
    await test.step("Add product to cart", async () => {
      await inventoryPage.addProductToCart("Sauce Labs Backpack");
      await inventoryPage.openCart();
    });

    await test.step("Start checkout", async () => {
      await cartPage.checkout();
    });

    await test.step("Fill checkout info", async () => {
      await checkoutPage.fillInfo("John", "Doe", "12345");
    });

    await test.step("Complete order", async () => {
      await checkoutPage.finish();
      await expect(
        checkoutPage.successMessage,
        "Success message should appear after checkout"
      ).toHaveText("Thank you for your order!");
    });
  });
});