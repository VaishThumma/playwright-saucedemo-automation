import { Page, Locator } from '@playwright/test';

export class ProductPage {


    private productThumbnails: Locator;
    private cart: Locator;
    private cartProductCountBadge: Locator;


    constructor(private page: Page) {

        this.productThumbnails = this.page.locator('.inventory_item');
        this.cart = this.page.locator('.primary_header .shopping_cart_link');
        this.cartProductCountBadge = this.page.locator('.primary_header .shopping_cart_badge')
    }

    getProductCard(product: string) {
        return this.productThumbnails.filter({ hasText: product });
    }

    async addProductsToCart(product1: string, product2: string) {

        await this.getProductCard(product1).getByRole('button', { name: 'Add to cart' }).click();
        await this.getProductCard(product2).getByRole('button', { name: 'Add to cart' }).click();

    }

    async goTocart() {
        await this.cart.click();
    }

    get productCountBadge() {
        return this.cartProductCountBadge;
    }

}