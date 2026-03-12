import { Page, Locator } from '@playwright/test';

export class CartPage {


    private cartTitle: Locator;
    private cartProducts: Locator;
    private checkout: Locator;

    constructor(private page: Page) {

        this.cartTitle = this.page.locator('.header_secondary_container').getByText(/Your Cart/);
        this.cartProducts = this.page.locator('.cart_item');
        this.checkout = this.page.getByRole('button', { name: 'Checkout' });
    }


    get title() {
        return this.cartTitle;
    }

    get checkOutButton() {
        return this.checkout;
    }

    getCartItems(product: string) {
        return this.cartProducts.filter({ hasText: product });

    }

}