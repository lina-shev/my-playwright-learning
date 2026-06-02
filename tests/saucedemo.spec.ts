// SauceDemo test suite
// Changes test
// Add more changes and test
import { test, expect } from '@playwright/test'

test.describe('SauceDemo', () => {

  test.describe('Login tests', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('https://saucedemo.com')
    })

    test('login with locked out user', async ({ page }) => {
  await page.locator('[data-test="username"]').fill('locked_out_user')
  await page.locator('[data-test="password"]').fill('secret_sauce')
  await page.locator('[data-test="login-button"]').click()

  await expect(
    page.locator('[data-test="error"]'),
    'Error should appear for locked out user'
  ).toHaveText('Epic sadface: Sorry, this user has been locked out.')
})

    test('login with valid credentials', async ({ page }) => {
      await page.locator('[data-test="username"]').fill('standard_user')
      await page.locator('[data-test="password"]').fill('secret_sauce')
      await page.locator('[data-test="login-button"]').click()
      await expect(page, 'Should redirect to inventory page after login').toHaveURL(/inventory/)
    })

    test('login with wrong password', async ({ page }) => {
      await page.locator('[data-test="username"]').fill('standard_user')
      await page.locator('[data-test="password"]').fill('wrong_password')
      await page.locator('[data-test="login-button"]').click()
      await expect(page.locator('[data-test="error"]'), 'Error should appear for wrong credentials').toBeVisible()
    })

    test('login with empty form', async ({ page }) => {
      await page.locator('[data-test="login-button"]').click()
      await expect(page.locator('[data-test="error"]'), 'Error should appear for empty form').toBeVisible()
    })

    test('login with only username', async ({ page }) => {
      await page.locator('[data-test="username"]').fill('standard_user')
      await page.locator('[data-test="login-button"]').click()
      await expect(page.locator('[data-test="error"]'), 'Error should appear when password is missing').toBeVisible()
    })

    test('login with only password', async ({ page }) => {
      await page.locator('[data-test="password"]').fill('secret_sauce')
      await page.locator('[data-test="login-button"]').click()
      await expect(page.locator('[data-test="error"]'), 'Error should appear when username is missing').toBeVisible()
    })

    test('login with trailing space in password', async ({ page }) => {
      await page.locator('[data-test="username"]').fill('standard_user')
      await page.locator('[data-test="password"]').fill('secret_sauce ')
      await page.locator('[data-test="login-button"]').click()
      await expect(page.locator('[data-test="error"]'), 'Error should appear when password has trailing space').toBeVisible()
    })
  })

  test.describe('Inventory tests', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('https://saucedemo.com')
      await page.locator('[data-test="username"]').fill('standard_user')
      await page.locator('[data-test="password"]').fill('secret_sauce')
      await page.locator('[data-test="login-button"]').click()
    })

    test('add product to cart', async ({ page }) => {
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
      await expect(page.locator('.shopping_cart_badge'), 'Cart badge should show 1 after adding a product').toHaveText('1')
    })


    test('remove product from cart', async ({ page }) => {
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
      await page.locator('[data-test="remove-sauce-labs-backpack"]').click()
      await expect(page.locator('.shopping_cart_badge'), 'Cart badge should not be visible after removing product').not.toBeVisible()
    })

    test('add 3 products and remove 1', async ({ page }) => {
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
      await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
      await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()
      await expect(page.locator('.shopping_cart_badge'), 'Cart badge should show 3 after adding 3 products').toHaveText('3')
      await page.locator('[data-test="remove-sauce-labs-backpack"]').click()
      await expect(page.locator('.shopping_cart_badge'), 'Cart badge should show 2 after removing 1 product').toHaveText('2')
    })

    test('sort products by price low to high', async ({ page }) => {
      await page.locator('[data-test="product-sort-container"]').selectOption('lohi')
      await expect(page.locator('[data-test="inventory-item-name"]').first(), 'First product should change after sorting by price').toHaveText('Sauce Labs Onesie')
    })

    test('cart keeps item after page refresh', async ({ page }) => {
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
      await page.reload()
      await expect(page.locator('.shopping_cart_badge'), 'Cart badge should still show 1 after page refresh').toHaveText('1')
    })
  })

})