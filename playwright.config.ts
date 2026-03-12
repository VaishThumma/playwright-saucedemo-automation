import { defineConfig } from '@playwright/test';
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: false,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. */
  reporter: [
    ['html'],
    ['list']
  ],

  /* Shared settings for all the projects below. */
  use: {
    baseURL: 'https://www.saucedemo.com/',
      headless: true,
      trace: 'retain-on-failure',
      screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [

    {
      name: 'setup',
      testMatch: /authSetup\.ts/,
      use: {
        browserName : 'chromium'
      }
      
    },

   {
      name: 'login-tests',
      testMatch: /loginValidAndInvalid\.spec\.ts/,
      use: {
        browserName : 'chromium'
      }
      
    },

    /* Only the shopping flow uses the storage state authentication information */
   {
      name: 'shopping-tests',
      testMatch: /shopping\.spec\.ts/,
      use: {
        browserName : 'chromium',
        storageState : 'playwright/.auth/userLogin.json'
      },
      dependencies: ['setup']
      
    },

  ],


});
