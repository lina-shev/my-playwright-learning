import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("Login", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test("standard user can log in", async ({ page }) => {
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL(/inventory/);
  });

  test("locked user sees error message", async () => {
    await loginPage.login("locked_out_user", "secret_sauce");
    await expect(loginPage.errorMessage).toContainText("locked out");
  });

  test("wrong password shows error message", async () => {
  await loginPage.login("standard_user", "wrong_password");
  await expect(loginPage.errorMessage).toBeVisible();
});

test("empty username shows validation error", async () => {
  await loginPage.login("", "secret_sauce");
  await expect(loginPage.errorMessage).toBeVisible();
});
});