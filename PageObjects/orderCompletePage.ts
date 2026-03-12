import { Page, Locator } from "@playwright/test";

export class OrderCompletePage {


    private orderSuccess: Locator;

    constructor(private page: Page) {

        this.orderSuccess = this.page.getByText('Thank you for your order!')

    }

    get orderSuccessMessage() {
        return this.orderSuccess;
    }


}