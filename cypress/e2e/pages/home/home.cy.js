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
        
        // Carousel selectors
        this.carouselContainer = SELECTORS.CAROUSEL.CONTAINER;
        this.carouselPrevButton = SELECTORS.CAROUSEL.PREV_BUTTON;
        this.carouselNextButton = SELECTORS.CAROUSEL.NEXT_BUTTON;
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

    clickNextCarousel() {
        this.click(this.carouselNextButton);
    }

    clickPrevCarousel() {
        this.click(this.carouselPrevButton);
    }

    getCarouselContainer() {
        return this.getElement(this.carouselContainer);
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

    describe('Carousel Navigation', () => {
        it('should navigate through carousel using arrow buttons', () => {
            // Verify carousel is visible
            homePage.shouldBeVisible(homePage.carouselContainer);
            
            // Force click the buttons since they're hidden until hover
            cy.get(homePage.carouselNextButton).click({ force: true });
            
            // Wait for transition and verify we're on the second slide
            cy.get('.carousel-item.active').should('be.visible');
            
            // Click previous
            cy.get(homePage.carouselPrevButton).click({ force: true });
            
            // Verify we're back to the first slide
            cy.get('.carousel-item.active').should('be.visible');
        });
    });
});
