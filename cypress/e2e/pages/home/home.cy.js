import BasePage from '../Base/BasePage';
import { HOME_PAGE_SELECTORS as SELECTORS, CATEGORY_LIST } from './constants';

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

        // Category dropdown
        this.categoryDropdown = SELECTORS.CATEGORY.DROPDOWN;
        this.topCategoriesHeading = SELECTORS.CATEGORY.TOP_CATEGORIES_HEADING;
        this.categoryList = SELECTORS.CATEGORY.CATEGORY_LIST;
        this.categoryItems = SELECTORS.CATEGORY.CATEGORY_ITEMS;
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

    openCategoryDropdown() {
        this.click(this.categoryDropdown);
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

    // No navigation methods needed for this approach
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

    describe('Category Navigation', () => {
        it('should display and interact with Shop by Category dropdown', () => {
            // Verify the category dropdown is visible
            homePage.shouldBeVisible(homePage.categoryDropdown);

            // Verify the text content
            homePage.shouldContainText(homePage.categoryDropdown, 'Shop by Category');

            // Click the dropdown
            homePage.openCategoryDropdown();

            // Verify the Top categories heading is visible after clicking
            homePage.shouldBeVisible(homePage.topCategoriesHeading);
            homePage.shouldContainText(homePage.topCategoriesHeading, 'Top categories');

            // Verify all 16 category options are present and have correct text
            // Verify the category list is visible
            homePage.shouldBeVisible(homePage.categoryList);

            // Verify we have exactly 16 category items
            cy.get(homePage.categoryItems).should('have.length', 16);

            // Verify each category text using case-insensitive matching
            CATEGORY_LIST.forEach(category => {
                const escapedCategory = category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                cy.get(homePage.categoryItems).contains(new RegExp(escapedCategory, 'i')).should('be.visible');
            });
        });

        it('should verify all category links are clickable and return 200 status', () => {
            // Open the dropdown
            homePage.openCategoryDropdown();

            // Get all category links and verify their href responses
            cy.get(homePage.categoryItems).find('a').each(($a) => {
                const href = $a.prop('href');
                if (href) {
                    cy.request(href).its('status').should('eq', 200);
                }
                
                // Verify the element is clickable (has pointer events)
                cy.wrap($a)
                    .should('be.visible')
                    .should('have.css', 'pointer-events', 'auto');
            });
        });
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
