// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Hide fetch/XHR requests from command log
const app = window.top;
if (app) {
    app.document.addEventListener('DOMContentLoaded', () => {
        const button = app.document.querySelector('.command-name-request');
        button?.click();
    });
}
