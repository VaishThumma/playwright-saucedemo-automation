import { Page, Locator } from '@playwright/test';

export class LoginPage {

    private userName: Locator;
    private password: Locator;
    private loginButton: Locator;
    private loginFailedText: Locator;


    constructor(private page: Page) {

        this.userName = this.page.getByRole('textbox', { name: 'Username' });
        this.password = this.page.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.page.locator('.submit-button').getByText('Login')
        this.loginFailedText = this.page.getByText(/Username and password do not match/)


    }

    async fillLoginDetails(username: string, password: string) {
        await this.userName.fill(username);
        await this.password.fill(password)
    }

    async fillIncorrectLoginDetails(username: string, incorrectpassword: string) {
        await this.userName.fill(username);
        await this.password.fill(incorrectpassword);
    }

    async login() {
        await this.loginButton.click();
    }


    get loginFailedMessage() {
        return this.loginFailedText;
    }


}