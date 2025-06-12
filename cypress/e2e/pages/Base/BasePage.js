class BasePage {
    constructor() {
        this.baseUrl = 'https://ecommerce-playground.lambdatest.io/';
    }

    // Common methods that will be used across all page objects
    visit(path) {
        cy.visit(path);
    }

    getElement(selector) {
        return cy.get(selector);
    }

    click(selector) {
        this.getElement(selector).click();
    }

    type(selector, text) {
        this.getElement(selector).type(text);
    }

    shouldBeVisible(selector) {
        this.getElement(selector).should('be.visible');
    }

    shouldContainText(selector, text) {
        this.getElement(selector).should('contain', text);
    }

    /**
     * Safely click an element with retry logic
     * @param {string} selector Element selector
     * @param {Object} options Click options
     */
    safeClick(selector, options = {}) {
        cy.get(selector, { timeout: TIMEOUTS.ANIMATION })
            .should('be.visible')
            .and('not.be.disabled')
            .then($el => {
                if ($el.is(':animated')) {
                    cy.wait(TIMEOUTS.ANIMATION);
                }
                cy.wrap($el).click(options);
            });
    }

    /**
     * Wait for network requests to complete
     * @param {string} route Route to wait for
     */
    waitForNetwork(route) {
        cy.intercept(route).as('networkRequest');
        cy.wait('@networkRequest', { timeout: TIMEOUTS.NETWORK })
            .its('response.statusCode')
            .should('eq', 200);
    }

    /**
     * Verify element exists and is interactive
     * @param {string} selector Element selector
     */
    verifyElementIsUsable(selector) {
        cy.get(selector, { timeout: TIMEOUTS.ANIMATION })
            .should('exist')
            .and('be.visible')
            .and('not.be.disabled')
            .then($el => {
                expect($el).to.not.have.css('pointer-events', 'none');
            });
    }

    /**
     * Handle failed requests gracefully
     * @param {string} url URL to request
     */
    async safeRequest(url) {
        try {
            const response = await cy.request({
                url,
                failOnStatusCode: false,
                retryOnNetworkFailure: true,
                timeout: TIMEOUTS.NETWORK
            });

            if (response.status !== 200) {
                cy.log(`Warning: Request to ${url} failed with status ${response.status}`);
            }

            return response;
        } catch (error) {
            cy.log(`Error requesting ${url}: ${error.message}`);
            throw error;
        }
    }
}

export default BasePage;
