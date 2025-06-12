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

describe('Home Page Tests', () => {
    const homePage = new HomePage();

    beforeEach(() => {
        homePage.visit();
    });

    it('should successfully load the home page', () => {
        // Verify the search input is visible
        homePage.shouldBeVisible(homePage.searchInput);
        
        // Verify the cart button is visible
        homePage.shouldBeVisible(homePage.cartButton);
        
        // Verify the my account dropdown is visible
        homePage.shouldBeVisible(homePage.myAccountDropdown);
    });

    it('should be able to search for a product', () => {
        const searchTerm = 'iPhone';
        homePage.search(searchTerm);
        
        // Verify search results - you can expand this based on the actual page structure
        cy.url().should('include', 'search=' + searchTerm);
    });
});
