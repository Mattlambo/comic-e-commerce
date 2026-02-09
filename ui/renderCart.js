export function renderCart(cart, products, cartViewEl) {
  const ids = Object.keys(cart.items);

  if (ids.length === 0) {
    cartViewEl.innerHTML = `
      <p>Your cart is empty.</p>
      <a href="./main.html">Continue shopping</a>
    `;
    return;
  }

  // Map products by id for quick lookup
  const byId = new Map(products.map(p => [String(p.id), p]));

  const rows = ids.map((id) => {
    const product = byId.get(id);
    const qty = cart.items[id];

    // If product is missing (data changed), skip gracefully
    if (!product) return "";

    const lineTotal = product.price * qty;

    return `
      <article class="cartRow" data-id="${product.id}">
        <img class="cartThumb" src="${product.image}" alt="${product.title} ${product.issue} cover">
        <div class="cartInfo">
          <p class="title">${product.title}</p>
          <p class="issue">${product.issue}</p>
          <p class="price">$${product.price}</p>
        </div>

        <div class="cartQty">
          <button class="qtyBtn dec" type="button" aria-label="Decrease quantity">−</button>
          <span class="qty">${qty}</span>
          <button class="qtyBtn inc" type="button" aria-label="Increase quantity">+</button>
        </div>

        <div class="cartLineTotal">
          $${lineTotal}
        </div>

        <button class="removeBtn" type="button">Remove</button>
      </article>
    `;
  }).join("");

  cartViewEl.innerHTML = `
    <section class="cartList">
      ${rows}
    </section>
  `;
}
