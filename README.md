README

Spawn Vault is a multi-page front-end e-commerce application built to simulate a collectible comic book storefront.
The application allows users to browse products, manage a persistent shopping cart, and complete a checkout workflow
with accessible form validation and input persistence.

This project was built using vanilla JavaScript to demonstrate mastery of core frontend fundamentals including state
management, modular architecture, DOM lifecycle awareness, event delegation, and client-side persistence.

FEATURES

Product Browsing
    Dynamic product card rendering
    Centralized product data model
    Scalable UI generation using loops and templates

Shopping Cart System
    Add items to cart
    Modify item quantities
    Remove items
    Dynamic subtotal calculations
    Persistent cart state across page reloads

Checkout Workflow
    Shipping form with built-in browser validation
    Custom inline validation messaging
    Automatic form data persistence while typing
    Cart badge synchronization across pages

Accessibility Enhancements
    Semantic HTML structure
    Inline validation feedback
    ARIA validation indicators
    Keyboard accessible controls


ARCHITECTURE OVERVIEW

The project uses a modular structure separating data, logic, UI rendering, and page orchestration.

data/
    products.js        → Product data source

lib/
    cart.js            → Cart state logic
    storage.js         → Persistence helpers

ui/
    renderProducts.js  → Product gallery renderer
    renderCart.js      → Cart UI renderer

pages/
    main.js            → Homepage controller
    cartPage.js        → Cart page controller
    checkoutPage.js    → Checkout controller


KEY TECHNICAL CONCEPTS DEMONSTRATED

    State Management
        Cart data is treated as application state rather than UI data, ensuring consistency across multiple pages.

    Derived State
        Cart totals and badge counts are calculated dynamically instead of stored separately, preventing data inconsistencies.

    Event Delegation
        Single parent listeners manage interactive elements, improving scalability and performance.

    Separation of Concerns
        Rendering, business logic, persistence, and page lifecycle logic are isolated into dedicated modules.

    DOM Lifecycle Awareness
        UI rendering and event listeners are initialized only after DOM elements are available.

    Persistence Strategy
        Cart data and checkout inputs persist across page reloads using safe JSON localStorage abstraction.

USER FLOW

Browse Products
      ↓
Add Items to Cart
      ↓
Review Cart Contents
      ↓
Modify Quantities / Remove Items
      ↓
Proceed to Checkout
      ↓
Enter Shipping Information
      ↓
Submit Order


VALIDATION AND PERSISTENCE
    The checkout system combines:
        -HTML Constraint Validation API
        -Custom validation messaging
        -Inline error feedback
        -Automatic form state saving
            This prevents user data loss and improves accessibility.


TECHNOLOGIES USED
    -HTML5
    -CSS3 (Flexbox & Grid)
    -Vanilla JavaScript (ES Modules)
    -LocalStorage API
    -Constraint Validation API


CHALLENGES AND SOLUTIONS
    -Maintaining Cart State Across Pages
        Implemented centralized cart state management combined with storage abstraction to maintain synchronization.

    -Preventing UI / Logic Coupling
        Separated rendering logic from business logic to maintain predictable UI updates and easier debugging.

    -Form Validation Without Frameworks
        Combined browser validation APIs with custom inline messaging for improved usability and accessibility.

    -Scalable Event Handling
        Implemented event delegation to manage user interactions efficiently across dynamic UI elements.

FUTURE IMPROVEMENTS
    -Product search and filtering
    -Order confirmation page
    -Payment gateway integration
    -Backend API integration
    -Responsive mobile layout optimization
    -Cart animation feedback

LESSONS LEARNED
    This project reinforced:
    -Designing UI as a projection of state
    -Importance of modular architecture
    -Lifecycle-aware rendering
    -Leveraging browser APIs effectively
    -Planning persistence strategies early in development

Author

Matt Lambert
