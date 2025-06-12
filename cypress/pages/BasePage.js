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
}

export default BasePage;
