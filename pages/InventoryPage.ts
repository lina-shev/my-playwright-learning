import { type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async addProductToCart(productName: string) {
    const product = this.page.locator('.inventory_item')
      .filter({ hasText: productName });
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
  async sortBy(option: string) {
    await this.page.locator('[data-test="product-sort-container"]').selectOption(option);
  }

  async getProductPrices(): Promise<number[]> {
    const priceElements = await this.page.locator('.inventory_item_price').allTextContents();
    return priceElements.map(price => parseFloat(price.replace('$', '')));
  }
}