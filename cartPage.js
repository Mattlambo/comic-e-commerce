import { products } from "./data/products.js";
import { readJSON, writeJSON } from "./lib/storage.js";
import { loadCart, saveCart, setQty, removeFromCart, getCartCount } from "./lib/cart.js";
import { renderCart } from "./ui/renderCart.js";

const cartViewEl = document.getElementById("cartView");
const subtotalEl = document.getElementById("subtotal");
const cartCountEl = document.querySelector(".cartCount");

if (!cartViewEl) throw new Error("Missing #cartView");
if (!subtotalEl) throw new Error("Missing #subtotal");
if (!cartCountEl) throw new Error("Missing .cartCount");

let cart = loadCart(readJSON);

render();
syncBadge();

cartViewEl.addEventListener("click", (e) => {
  const row = e.target.closest(".cartRow");
  if (!row) return;

  const productId = Number(row.dataset.id);
  if (!Number.isFinite(productId)) return;

  // Current qty from state (source of truth)
  const currentQty = cart.items[String(productId)] || 0;

  if (e.target.closest(".inc")) {
    cart = setQty(cart, productId, currentQty + 1);
  } else if (e.target.closest(".dec")) {
    cart = setQty(cart, productId, currentQty - 1);
  } else if (e.target.closest(".removeBtn")) {
    cart = removeFromCart(cart, productId);
  } else {
    return;
  }

  saveCart(writeJSON, cart);
  render();
  syncBadge();
});

function render() {
  renderCart(cart, products, cartViewEl);
  subtotalEl.textContent = `$${calcSubtotal(cart, products)}`;
}

function syncBadge() {
  cartCountEl.textContent = String(getCartCount(cart));
}

function calcSubtotal(cart, products) {
  const byId = new Map(products.map(p => [String(p.id), p]));
  return Object.entries(cart.items).reduce((sum, [id, qty]) => {
    const p = byId.get(id);
    if (!p) return sum;
    return sum + p.price * qty;
  }, 0);
}
