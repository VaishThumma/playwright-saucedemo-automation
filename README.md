![Playwright Tests](https://github.com/VaishThumma/Playwright_Ecommerce_Automation/actions/workflows/playwright.yml/badge.svg)

# Playwright SauceDemo Automation Framework

This repository demonstrates a UI automation framework for the SauceDemo e-commerce application using **Playwright and TypeScript**.

The project showcases practical automation design patterns including **Page Object Model (POM)**, **authentication reuse using Playwright storageState**, **data-driven testing**, and **checkout price validations business logic**.



# Key Features

## Authentication Reuse (storageState)

A dedicated authentication setup test logs in once and stores the browser session using Playwright **storageState**.

Shopping flow tests reuse this authenticated session to avoid repeated UI logins and improve execution speed.



## Page Object Model (POM)

All UI locators and page actions are encapsulated inside Page Object classes.

This ensures test readability, maintainability, and easier updates when the UI changes.

---

## Data-Driven Testing

Test inputs such as user credentials, product names, and checkout details are stored in a centralized JSON file.

This keeps test logic separate from test data and improves scalability.

---

## Checkout Business Logic Validation

The checkout tests validate the correctness of pricing calculations:

- **Item Price × Quantity = Subtotal**
- **Subtotal + Tax = Total Price**

This ensures the UI reflects correct business logic rather than only verifying UI behavior.

---

## Utility Helpers

Reusable helper logic (such as currency parsing reusable function) is placed inside the `utils` directory to keep tests clean and follow the **DRY principle**.

---

## Structured Test Architecture

Tests are separated by functional flows:

- Login (positive and negative) validation tests
- Shopping and checkout flow tests

---

## Reporting

The framework uses Playwright’s **HTML Reporter** and **List Reporter** for clear terminal output and detailed execution reports.

---

# Tech Stack

- **Framework:** Playwright
- **Language:** TypeScript
- **Test Architecture:** Page Object Model
- **Formatting:** Prettier
- **Version Control:** Git

---

# Project Structure

```text
PageObjects/
  homePage.ts
  loginPage.ts
  productPage.ts
  cartPage.ts
  checkOutPage.ts
  orderCompletePage.ts

tests/
  authSetup.ts
  loginValidAndInvalid.spec.ts
  shopping.spec.ts

utils/
  mathUtils.ts  
  testData.json

playwright/
  .auth/

playwright.config.ts
package.json
README.md
.gitignore
```

---

## Framework Architecture

The framework is organized into distinct layers for better scalability and maintainability:

- **tests/**  
  Contains the `.spec.ts` files describing the test scenarios and user flows.

- **PageObjects/**  
  Contains the Page Object classes that encapsulate UI locators and page-specific actions.

- **utils/**  
  Contains reusable helper logic and test data utilities used across tests.

- **playwright.config.ts**  
  Centralized configuration for test environments, authentication setup, reporters, and project execution settings.

- **Reusable Test Setup**
  Common preconditions such as adding products to the cart are prepared using reusable helper functions or hooks.  
  This keeps test cases focused on validations rather than repeating setup steps.

 ---

# Authentication Strategy

Authentication is handled using Playwright’s **storageState** mechanism.

1. `authSetup.ts` performs login once.
2. The authenticated session is stored inside:

```
playwright/.auth/userLogin.json
```

3. Shopping tests reuse this session automatically through Playwright project configuration.

This approach:

- Speeds up test execution
- Avoids repeating login steps
- Keeps test flows focused on business functionality

---

# Example Test Scenarios

## Login Tests

- Successful login with valid credentials
- Login failure with invalid credentials

## Shopping Flow

- Add products to cart
- Verify cart badge updates correctly
- Validate items present in cart
- Complete checkout flow
- Validate subtotal calculations
- Validate total price including tax
- Confirm successful order placement

---

# Running the Project

Install dependencies

```bash
npm install
```

Run all tests

```bash
npm test
```

Run login tests only

```bash
npm run test:login
```

Run shopping flow tests

```bash
npm run test:shopping
```

Open HTML report

```bash
npm run report
```

Run tests with visible browser

```bash
npm run test:headed
```

---

# Reporting

After execution, Playwright generates an HTML report.

To open the report:

```bash
npm run report
```

This provides detailed information about:

- Test execution results
- Failed steps
- Screenshots for failures
- Execution timeline

---

# Code Quality

The project uses **Prettier** for consistent code formatting.

Formatting can be run using:

```bash
npx prettier --write .
```

---

# Author

**Vaish Thumma**

QA Automation | Playwright | UI Testing | Test Automation