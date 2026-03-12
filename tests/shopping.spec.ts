import { test, expect } from '@playwright/test';
import { ProductPage } from '../PageObjects/productPage';
import { CartPage } from '../PageObjects/cartPage';
import { CheckOutPage } from '../PageObjects/checkOutPage';
import { OrderCompletePage } from '../PageObjects/orderCompletePage';
import testData from '../utils/testData.json';


test.beforeEach(async ({ page }) => {
  // Add two products to cart before each shopping test

  // Create Required Objects
  const productPage = new ProductPage(page);

  // Go to site - user is already logged-in
  await page.goto('/inventory.html');

  //Expect the desired products to be visible
  await expect(productPage.getProductCard(testData.DesiredProduct1)).toBeVisible();
  await expect(productPage.getProductCard(testData.DesiredProduct2)).toBeVisible();

  //Add desired products to cart
  await productPage.addProductsToCart(testData.DesiredProduct1, testData.DesiredProduct2);

  // Verify if the addition was successful
  await expect(productPage.productCountBadge).toBeVisible();
  await expect(productPage.productCountBadge).toContainText('2');

})

test('verify cart contents', async ({ page }) => {

  // Create Required Objects
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  // Go to Cart

  await productPage.goTocart();
  await expect(cartPage.title).toBeVisible();


  await expect(cartPage.getCartItems(testData.DesiredProduct1)).toBeVisible();
  await expect(cartPage.getCartItems(testData.DesiredProduct2)).toBeVisible();


})

test('complete checkout and validate order summary totals', async ({ page }) => {

  // Create Required Objects
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckOutPage(page);
  const orderCompletePage = new OrderCompletePage(page);

  // Go to Cart
  await productPage.goTocart();
  await expect(cartPage.title).toBeVisible();

  // Checkout
  await cartPage.checkOutButton.click();

  // Verify successful checkout navigation
  await expect(page).toHaveURL(/checkout-step-one.html/);
  await expect(checkoutPage.title).toBeVisible();

  // fill step 1 of checkout - user information
  await checkoutPage.fillCheckoutDetails(testData.FirstName, testData.LastName, testData.Zip);
  await checkoutPage.continueCheckOut();

  // Verify details in checkout Overview
  await expect(checkoutPage.detailsOverviewTitle).toBeVisible();

  await expect(checkoutPage.getCheckOutItems(testData.DesiredProduct1)).toBeVisible();
  await expect(checkoutPage.getCheckOutItems(testData.DesiredProduct2)).toBeVisible();

  // Make Price Validations 

  const calculatedSubTotal = await checkoutPage.getCalculatedSubtotal();
  const subTotalDisplayed = await checkoutPage.getSubTotalDisplayed();
  const taxAmount = await checkoutPage.getTaxAmount();
  const totalPriceDisplayed = await checkoutPage.getTotalPriceDisplayed();

  // Capture calculated subtotal and displayed subtotal values in report
  await test.info().attach('Subtotal-Calculation', {
    body: `Calculated Subtotal: ${calculatedSubTotal} | UI Displayed Subtotal: ${subTotalDisplayed}`,
    contentType: 'text/plain'
  })

  // Verify the subtotal value in UI against the calculated subtotal
  expect(subTotalDisplayed).toBeCloseTo(calculatedSubTotal, 2)

  // Verify the total price displayed in UI 
  expect(totalPriceDisplayed).toBeCloseTo(calculatedSubTotal + taxAmount, 2);

  await checkoutPage.finishCheckout();

  // Verify successful order completion
  await expect(orderCompletePage.orderSuccessMessage).toBeVisible();
  await expect(page).toHaveURL(/checkout-complete/)

})
