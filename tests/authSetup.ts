import { test as setup, expect } from '@playwright/test';
import { HomePage } from '../PageObjects/homePage';
import { LoginPage } from '../PageObjects/loginPage';
import testData from '../utils/testData.json';

setup('authentication', async ({ browser }) => {

    const webContext = await browser.newContext();
    const page = await webContext.newPage();
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    //Go to site
    await homePage.open();

    // Fill Login details
    await loginPage.fillLoginDetails(testData.UserName, testData.password);
    await loginPage.login();
    await expect(page).toHaveURL(/inventory.html/)
    await expect(homePage.title).toBeVisible();

    // Store the storageState after login in the file mentioned 
    await webContext.storageState({ path: 'playwright/.auth/userLogin.json' });

    await webContext.close();

})