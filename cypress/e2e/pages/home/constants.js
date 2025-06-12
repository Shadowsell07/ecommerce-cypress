export const CATEGORY_LIST = [
    'Components',
    'Cameras',
    'Phone, Tablets & IPod',
    'Software',
    'MP3 Players',
    'Laptops & Notebooks',
    'Desktops and Monitors',
    'Printers & Scanners',
    'Mice and Trackballs',
    'Fashion And Accessories',
    'Beauty and Saloon',
    'Autoparts and Accessories',
    'Washing machine',
    'Gaming Consoles',
    'Air conditioner',
    'Web Cameras'
];

export const HOME_PAGE_SELECTORS = {
    SEARCH: {
        INPUT: '[aria-label="Search For Products"]:first',
        BUTTON: '.search-button:first'
    },
    CAROUSEL: {
        CONTAINER: '.carousel.slide:first',
        PREV_BUTTON: '.carousel-control-prev:first',
        NEXT_BUTTON: '.carousel-control-next:first'
    },
    CATEGORY: {
        DROPDOWN: '[data-id="217832"]',
        TOP_CATEGORIES_HEADING: 'h5:contains("Top categories")',
        CATEGORY_LIST: '.navbar-nav.vertical:first',
        CATEGORY_ITEMS: '.navbar-nav.vertical:first .nav-item'
    },
    CART: {
        BUTTON: '[data-id="217825"]'
    },
    ACCOUNT: {
        DROPDOWN: '.dropdown-toggle[href="https://ecommerce-playground.lambdatest.io/index.php?route=account/account"]'
    }
};

export const SELECTORS = {
    // ...existing code...
    CAROUSEL_CONTAINER: '[data-cy="main-carousel"]',
    CAROUSEL_NEXT: '[data-cy="carousel-next"]',
    CAROUSEL_PREV: '[data-cy="carousel-prev"]',
    CATEGORY_DROPDOWN: '[data-cy="category-dropdown"]',
    CATEGORY_ITEMS: '[data-cy="category-items"]',
    SEARCH_INPUT: '[data-cy="search-input"]',
    // ...existing code...
};

export const TIMEOUTS = {
    ANIMATION: 5000,
    NETWORK: 10000,
    TRANSITION: 2000
};
