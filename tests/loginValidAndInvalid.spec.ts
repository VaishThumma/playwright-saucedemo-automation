import { test, expect } from '@playwright/test';
import { LoginPage } from '../PageObjects/loginPage';
import { HomePage } from '../PageObjects/homePage';
import testData from '../utils/testData.json'

// Successful Login 

test('Successful Login to application', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    //Go to site
    homePage.open();

    // Fill Login details
    await loginPage.fillLoginDetails(testData.UserName, testData.password);
    await loginPage.login();
    await expect(homePage.title).toBeVisible();

    // Logout 

    await homePage.openMenu.click();
    await expect(homePage.logOutLink).toBeVisible();
    await homePage.logOutLink.click();

})

// Invalid Login

test('Login attempt denied verification with incorrect credentials', async ({ page }) => {

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    //Go to site
    homePage.open();

    // Fill Login details
    await loginPage.fillLoginDetails(testData.UserName, testData.incorrectPassword);
    await loginPage.login();


    // Verify if the Login failed message appears
    await expect(loginPage.loginFailedMessage).toBeVisible();

})

