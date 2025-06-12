import BasePage from './BasePage';

class HomePage extends BasePage {
    constructor() {
        super();
        // Selectors
        this.searchInput = '#search input';
        this.searchButton = '#search button';
        this.cartButton = '#cart';
        this.myAccountDropdown = '.dropdown-toggle[href="https://ecommerce-playground.lambdatest.io/index.php?route=account/account"]';
    }

    visit() {
        super.visit('/');
    }

    search(product) {
        this.type(this.searchInput, product);
        this.click(this.searchButton);
    }

    openCart() {
        this.click(this.cartButton);
    }

    openMyAccount() {
        this.click(this.myAccountDropdown);
    }
}

export default HomePage;
