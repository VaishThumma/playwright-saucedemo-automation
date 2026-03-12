import { Page, Locator } from '@playwright/test';


export class HomePage {

  //Variable Declarations  

  private menuButton: Locator;
  private productsTitle: Locator;
  private logOutButton: Locator;


  constructor(private page: Page) {

    this.productsTitle = this.page.locator('.header_secondary_container').getByText('Products');
    this.menuButton = this.page.locator('.primary_header').getByRole('button', { name: 'Open Menu' });
    this.logOutButton = this.page.locator('.bm-menu-wrap').getByRole('link', { name: 'Logout' });
  }

  async open() {
    await this.page.goto('/');

  }

  get title() {
    return this.productsTitle;
  }

  get openMenu() {
    return this.menuButton;
  }

  get logOutLink() {
    return this.logOutButton;
  }


}

