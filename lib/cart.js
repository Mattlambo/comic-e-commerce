const CART_KEY = "spawnVault.cart.v1";     //used for local storage

export function loadCart(readJSON) {              //a data retriever for shopping cart.
  return readJSON(CART_KEY, { items: {} });
}

export function saveCart(writeJSON, cart) {   //data persistence helper. takes current state of shopping cart and saves it back to storage.
  writeJSON(CART_KEY, cart);
}

export function addToCart(cart, productId, qty = 1) {     //adds an item to the cart using immutability. It creates a new copy of the cart instead of changing the original.
  const id = String(productId);
  const next = structuredClone(cart);                            //by cloning you avoid side effects.
  next.items[id] = (next.items[id] || 0) + qty;
  return next;
}

export function setQty(cart, productId, qty) {                  //updates a product's quantity directly or removes it if too low.
  const id = String(productId);
  const next = structuredClone(cart);                           //creates a fresh deep copy so you don't mutate the original cart.

  if (qty <= 0) {
    delete next.items[id];
  } else {
    next.items[id] = qty;
  }
  return next;
}

export function removeFromCart(cart, productId) {                           //completely removes a specific product from the shopping cart.
  const id = String(productId);
  const next = structuredClone(cart);
  delete next.items[id];
  return next;
}

export function getCartCount(cart) {                                        //calculates the total number of items currently in the cart buy summing up all the quantities.
  return Object.values(cart.items).reduce((sum, n) => sum + n, 0);
}
