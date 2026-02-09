import { readJSON, writeJSON } from "./lib/storage.js";
import { loadCart, getCartCount } from "./lib/cart.js";

import { products } from "./data/products.js";


const FORM_KEY = "spawnVault.checkoutForm.v1";

const formEl = document.getElementById("checkoutForm");
const saveStatusEl = document.getElementById("saveStatus");
const cartCountEl = document.querySelector(".cartCount");

if (!formEl) throw new Error("Missing #checkoutForm");
if (!saveStatusEl) throw new Error("Missing #saveStatus");
if (!cartCountEl) throw new Error("Missing .cartCount");

// --- Cart badge sync (consistency across pages)
const cart = loadCart(readJSON);
cartCountEl.textContent = String(getCartCount(cart));

// --- Restore saved form
const saved = readJSON(FORM_KEY, {});
fillForm(formEl, saved);

// --- Save as user types (debounced-ish)
let saveTimer = null;

formEl.addEventListener("input", () => {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    persistForm();
    setStatus("Saved");
  }, 250);
});

// Validate on blur (field-level feedback)
formEl.addEventListener("blur", (e) => {
  const field = e.target;
  if (!(field instanceof HTMLInputElement)) return;
  validateField(field);
}, true);

// Submit handler
formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  // validate all fields
  const inputs = Array.from(formEl.querySelectorAll("input"));
  let allValid = true;

  for (const input of inputs) {
    const ok = validateField(input);
    if (!ok) allValid = false;
  }

  if (!allValid) {
    setStatus("Fix the highlighted fields.");
    return;
  }

  persistForm();
  setStatus("Order info looks good.");
  // Next step could be: window.location.href = "./confirmation.html";
});

// ---------------- helpers ----------------

function persistForm() {
  const data = getFormData(formEl);
  writeJSON(FORM_KEY, data);
}

function getFormData(form) {
  const fd = new FormData(form);
  return Object.fromEntries(fd.entries());
}

function fillForm(form, data) {
  for (const [name, value] of Object.entries(data)) {
    const input = form.elements.namedItem(name);
    if (input && input instanceof HTMLInputElement) {
      input.value = String(value);
    }
  }
}

function validateField(input) {
  // Clear previous custom message
  input.setCustomValidity("");

  // Custom messages by field name
  const name = input.name;

  if (input.validity.valueMissing) {
    input.setCustomValidity("This field is required.");
  } else if (name === "state" && input.validity.patternMismatch) {
    input.setCustomValidity("Use a 2-letter state code (e.g., IL).");
  } else if (name === "zip" && input.validity.patternMismatch) {
    input.setCustomValidity("ZIP must be 5 digits.");
  } else if (name === "email" && input.validity.typeMismatch) {
    input.setCustomValidity("Enter a valid email address.");
  } else if (input.validity.tooShort) {
    input.setCustomValidity(`Must be at least ${input.minLength} characters.`);
  }

  // Show/hide inline error
  const errorEl = formEl.querySelector(`[data-error-for="${CSS.escape(name)}"]`);
  const isValid = input.checkValidity();

  if (errorEl) {
    errorEl.textContent = isValid ? "" : input.validationMessage;
  }

  input.setAttribute("aria-invalid", String(!isValid));
  return isValid;
}

function setStatus(msg) {
  saveStatusEl.textContent = msg;
}
const subtotalEl = document.getElementById("checkoutSubtotal");
if (!subtotalEl) throw new Error("Missing #checkoutSubtotal");
function calcSubtotal(cart, products) {
  const byId = new Map(products.map(p => [String(p.id), p]));

  return Object.entries(cart.items).reduce((sum, [id, qty]) => {
    const product = byId.get(id);
    if (!product) return sum;
    return sum + product.price * qty;
  }, 0);
}
subtotalEl.textContent = `$${calcSubtotal(cart, products)}`;

