export function renderProducts(products, galleryEl) {
  galleryEl.innerHTML = "";

  for (const product of products) {
    const card = document.createElement("article");
    card.className = "productCard";

    card.innerHTML = `
      <button class="icon-btn addBtn" type="button" data-id="${product.id}">
        <img class="productImage" src="${product.image}" alt="${product.title} ${product.issue} cover">
        <span class="overlay">Add to cart</span>
      </button>

      <p class="title">${product.title}</p>
      <p class="issue">${product.issue}</p>
      <p class="price">$${product.price}</p>
    `;

    galleryEl.appendChild(card);
  }
}
// Role: Rendering layer (data → DOM)
// Does:
//
// Converts product objects into DOM nodes
//
// Applies correct markup + classes
//
// Inserts elements into the provided container
//
// Does NOT:
//
// Handle clicks
//
// Modify cart state
//
// Read from localStorage
//
// This is intentionally “dumb” code — given data, it draws.