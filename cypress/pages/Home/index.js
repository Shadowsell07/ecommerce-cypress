import BasePage from '../Base/BasePage';
import { HOME_PAGE_SELECTORS as SELECTORS } from './constants';

class HomePage extends BasePage {
    constructor() {
        super();
        // Selectors
        this.searchInput = SELECTORS.SEARCH.INPUT;
        this.searchButton = SELECTORS.SEARCH.BUTTON;
        this.cartButton = SELECTORS.CART.BUTTON;
        this.myAccountDropdown = SELECTORS.ACCOUNT.DROPDOWN;
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
