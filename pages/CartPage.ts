import { type Locator, type Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async removeProduct(productName: string) {
    const item = this.page.locator('.cart_item')
      .filter({ hasText: productName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }
}