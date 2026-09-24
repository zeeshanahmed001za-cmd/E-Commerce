// main.js is essentially the entry point / coordinator of the application.
// orchestrator
// It starts the application and tells the different parts when to do their jobs.

import { renderCart } from "./cart/cartView.js";
import { loadProducts } from "./products/productsServices.js";
import { renderProducts } from "./products/productView.js";
import { state } from "./state.js";
import { renderWishListProducts } from "./wishlist/wishListView.js";
import { initializationCheckoutForm } from "./checkout/checkoutView.js";
import { renderOrderHistory } from "./orders/orderHistoryView.js";
import { loadCart } from "./orders/orderStorage.js";

async function init() {
  renderProducts(state.products);

  await loadProducts();
  renderProducts(state.products);
  state.cart = loadCart();
  renderCart();
  renderWishListProducts();
  initializationCheckoutForm();
  renderOrderHistory();
}

init();
