import { Page, Locator } from "@playwright/test";
import { convertStringToFloat } from "../utils/mathUtils";  // Custom Math Helper function

export class CheckOutPage {

    private checkTitle: Locator;
    private firstName: Locator;
    private lastName: Locator;
    private zipCode: Locator;
    private continue: Locator;
    private checkoutOverviewTitle: Locator;
    private checkOutProducts: Locator;
    private itemSubtotal: Locator;
    private taxAmount: Locator;
    private summaryTotal: Locator;
    private finishButton: Locator;

    constructor(private page: Page) {

        this.checkTitle = this.page.locator('#header_container').getByText('Checkout: Your Information');
        this.firstName = this.page.getByPlaceholder('First Name');
        this.lastName = this.page.getByPlaceholder('Last Name');
        this.zipCode = this.page.getByPlaceholder('Zip/Postal Code');
        this.continue = this.page.locator('.checkout_buttons').getByText('Continue')
        this.checkoutOverviewTitle = this.page.locator('#header_container').getByText('Checkout: Overview');
        this.checkOutProducts = this.page.locator('.cart_item');
        this.itemSubtotal = this.page.locator('.summary_info .summary_subtotal_label');
        this.taxAmount = this.page.locator('.summary_info .summary_tax_label')
        this.summaryTotal = this.page.locator('.summary_info .summary_total_label');
        this.finishButton = this.page.getByRole('button', { name: 'Finish' });

    }

    get title() {
        return this.checkTitle;
    }

    async fillCheckoutDetails(fname: string, lname: string, zip: string) {
        await this.firstName.fill(fname);
        await this.lastName.fill(lname);
        await this.zipCode.fill(zip);
    }

    async continueCheckOut() {
        await this.continue.click();
    }

    get detailsOverviewTitle() {
        return this.checkoutOverviewTitle;
    }

    getCheckOutItems(product: string) {
        return this.checkOutProducts.filter({ hasText: product });
    }

    getItemQuantity(parentItem: Locator) {
        return parentItem.locator('.cart_quantity')
    }

    getItemUnitPrice(parentItem: Locator) {
        return parentItem.locator('.inventory_item_price')
    }

    async getTaxAmount() {

        const taxAmount = await this.taxAmount.innerText();
        return convertStringToFloat(taxAmount);
    }

    async getSubTotalDisplayed() {
        const subTotalDisplayed = await this.itemSubtotal.innerText();
        return convertStringToFloat(subTotalDisplayed);
    }

    async getTotalPriceDisplayed() {
        const totalPriceDisplayed = await this.summaryTotal.innerText();
        return convertStringToFloat(totalPriceDisplayed);
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async getCalculatedSubtotal() {

        await this.checkOutProducts.first().waitFor();
        let calculatedSubtotal = 0;
        const allCheckOutItems = await this.checkOutProducts.all();

        for (const item of allCheckOutItems) {

            const quantityRaw = await this.getItemQuantity(item).innerText();
            const unitPriceRaw = await this.getItemUnitPrice(item).innerText();

            const productQuantity = convertStringToFloat(quantityRaw);
            const unitPrice = convertStringToFloat(unitPriceRaw);

            calculatedSubtotal += (productQuantity * unitPrice);

        }
        return calculatedSubtotal;

    }

}