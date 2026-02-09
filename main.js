import { products } from "./data/products.js";
import { renderProducts } from "./ui/renderProducts.js";

import { readJSON, writeJSON } from "./lib/storage.js";
import { loadCart, saveCart, addToCart, getCartCount } from "./lib/cart.js";

const galleryEl = document.getElementById("productGallery");
const cartCountEl = document.querySelector(".cartCount");

if (!galleryEl) throw new Error("Missing #productGallery");
if (!cartCountEl) throw new Error("Missing .cartCount");

renderProducts(products, galleryEl);

let cart = loadCart(readJSON);
syncCartBadge();

galleryEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".icon-btn, .addBtn, .buyBtn");
  if (!btn) return;

  const id = Number(btn.dataset.id);
  if (!Number.isFinite(id)) return;

  cart = addToCart(cart, id);
  saveCart(writeJSON, cart);
  syncCartBadge();
});

function syncCartBadge() {
  cartCountEl.textContent = String(getCartCount(cart));
}

//Role: Application orchestrator
// Does:
//
// Imports data, rendering, and logic modules
//
// Initializes the app
//
// Wires events (event delegation)
//
// Coordinates state → UI updates
//
// Does NOT:
//
// Contain product data
//
// Build DOM markup directly
//
// Store cart logic internally
//
