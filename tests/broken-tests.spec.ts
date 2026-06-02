// Broken tests suit
import { test, expect } from "@playwright/test";

test("login should redirect to inventory", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/inventory/);
});

test("error message on wrong password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("wrong_password");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.locator('[data-test="error"]')).toHaveText(
  "Epic sadface: Username and password do not match any user in this service"
);
});

test("cart badge appears after adding product", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
});

// Fix Report
//
// Test #1:
// Root cause: placeholder text was "User Name" (with a space) but the actual placeholder is "Username"
// Fix: changed getByPlaceholder("User Name") to getByPlaceholder("Username")
// How I verified: ran npx playwright test broken-tests.spec.ts --project=chromium — 3 passed
//
// Test #2:
// Root cause: error message text was incomplete — missing "Epic sadface: " at the beginning
// and "any user in this service" at the end. Also getByTestId was used instead of page.locator('[data-test="error"]')
// Fix: updated the text to the full error message and replaced getByTestId with page.locator('[data-test="error"]')
// How I verified: ran npx playwright test broken-tests.spec.ts --project=chromium — 3 passed
//
// Test #3:
// Root cause: missing await before page.locator(...).click() — the test did not wait
// for the item to be added to the cart before checking the badge
// Fix: added await before click()
// How I verified: ran npx playwright test broken-tests.spec.ts --project=chromium — 3 passed