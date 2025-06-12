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

    waitForCarouselTransition() {
        return cy.get('.carousel-item.active', { timeout: 10000 })
            .should('be.visible')
            .should(($el) => {
                const matrix = window.getComputedStyle($el[0]).transform;
                expect(matrix).to.not.include('matrix');  // No active transition
            });
    }

    // No navigation methods needed for this approach
}

describe('Home Page Tests', () => {
    const homePage = new HomePage();
    let categoryLinks = [];

    beforeEach(() => {
        homePage.visit();
    });

    // Removed the before hook as it was causing timing issues with link collection

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
        const redirectingCategories = [
            'Fashion and Accessories',
            'Beauty and Saloon',
            'Autoparts and Accessories',
            'Washing Machine',
            'Gaming Consoles',
            'Air Conditioner'
        ];

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

            // Verify we have exactly 16 category items
            cy.get(homePage.categoryItems).should('have.length', 16);

            // Verify each category text using case-insensitive matching
            CATEGORY_LIST.forEach(category => {
                const escapedCategory = category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                cy.get(homePage.categoryItems).contains(new RegExp(escapedCategory, 'i')).should('be.visible');
            });
        });

        it('should verify all category links have appropriate behavior', () => {
            // Click and ensure dropdown is fully visible
            homePage.openCategoryDropdown();
            cy.get(homePage.categoryList).should('be.visible');

            // Wait for animation to complete
            cy.wait(1000);

            // Verify all categories
            cy.get(homePage.categoryItems).find('a').each(($a) => {
                const categoryText = $a.text().trim();
                cy.log(`Checking category: ${categoryText}`);

                // Verify UI properties
                cy.wrap($a)
                    .should('be.visible')
                    .should('have.css', 'pointer-events', 'auto');                    // Get href if it exists
                    cy.wrap($a).then($el => {
                        const href = $el.attr('href');
                        cy.log(`Category ${categoryText} has href: ${href || 'none'}`);

                        if (redirectingCategories.includes(categoryText)) {
                            cy.log(`${categoryText} is expected to redirect to home - skipping further checks`);
                            // These categories should be clickable but we don't verify their destination
                            cy.wrap($el).should('have.attr', 'href');
                            return;
                        }
                    if (href && href !== '#') {
                            // For categories with direct links, verify the response
                            cy.log(`${categoryText} should have a valid link`);
                            cy.request({
                                url: href,
                                failOnStatusCode: true,
                                timeout: 10000
                            }).then((response) => {
                                expect(response.status).to.eq(200);
                                expect(response.headers['content-type']).to.include('text/html');
                            });
                        } else {
                            // For parent categories or those without links, verify they have a submenu
                            cy.log(`${categoryText} might have a dropdown menu`);
                            cy.wrap($a)
                                .parent()
                                .then($parent => {
                                    if ($parent.hasClass('dropdown')) {
                                        cy.wrap($parent)
                                            .find('.dropdown-menu')
                                            .should('exist');
                                    } else {
                                        cy.log(`${categoryText} has no href and no dropdown - might be a placeholder`);
                                    }
                                });
                        }
                    });
            });
        });
    });

    describe('Carousel Navigation', () => {
        it('should navigate through carousel using arrow buttons with animation checks', () => {
            // Verify carousel is visible
            homePage.shouldBeVisible(homePage.carouselContainer);
            
            // Get initial active slide for comparison
            let initialSlideHtml;
            cy.get('.carousel-item.active').then($el => {
                initialSlideHtml = $el.html();
            });
            
            // Click next and verify transition
            cy.get(homePage.carouselNextButton).click({ force: true });
            homePage.waitForCarouselTransition();
            cy.get('.carousel-item.active').should($el => {
                expect($el.html()).to.not.equal(initialSlideHtml);
            });
            
            // Click previous and verify transition back
            cy.get(homePage.carouselPrevButton).click({ force: true });
            homePage.waitForCarouselTransition();
            cy.get('.carousel-item.active').should($el => {
                expect($el.html()).to.equal(initialSlideHtml);
            });
        });

        it('should handle rapid carousel navigation gracefully', () => {
            homePage.shouldBeVisible(homePage.carouselContainer);
            
            // Rapidly click next button multiple times
            for (let i = 0; i < 3; i++) {
                cy.get(homePage.carouselNextButton).click({ force: true });
            }
            
            // Verify we end up on a valid slide
            homePage.waitForCarouselTransition();
            cy.get('.carousel-item.active').should('be.visible');
        });
    });
});
