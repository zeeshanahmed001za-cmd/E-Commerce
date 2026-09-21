// Cart UI

import { state } from "../state.js";
import {
  decreaseQuantity,
  getCartItemCount,
  getCartSubtotal,
  getSubTotal,
  increaseQuantity,
  removeFromCart,
} from "./cartLogic.js";

function getCartProducts() {
  return state.cart.map((cartItem) => {
    const product = state.products.find(
      (product) => product.id === cartItem.productId,
    );

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: cartItem.quantity,
    };
  });
}

export function renderCart() {
  const cartContainer = document.querySelector("#cart");

  const products = getCartProducts();

  cartContainer.replaceChildren();

  if (products.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add("empty-cart");
    emptyMessage.textContent = "Your cart is empty.";

    cartContainer.append(emptyMessage);
    return;
  }

  const cartItems = document.createElement("div");
  cartItems.classList.add("cart-items");

  products.forEach((product) => {
    const cartElement = document.createElement("div");
    cartElement.classList.add("cart-item");

    cartElement.dataset.id = product.id;

    const name = document.createElement("h3");
    name.classList.add("cart-item-name");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.classList.add("cart-item-price");
    price.textContent = `₹${product.price}`;

    const quantityControls = document.createElement("div");
    quantityControls.classList.add("quantity-controls");

    const decreaseButton = document.createElement("button");
    decreaseButton.classList.add("quantity-button");
    decreaseButton.textContent = "-";

    decreaseButton.addEventListener("click", () => {
      decreaseQuantity(product.id);
      renderCart();
    });

    const quantity = document.createElement("span");
    quantity.classList.add("cart-item-quantity");
    quantity.textContent = product.quantity;

    const increaseButton = document.createElement("button");
    increaseButton.classList.add("quantity-button");
    increaseButton.textContent = "+";

    increaseButton.addEventListener("click", () => {
      increaseQuantity(product.id);
      renderCart();
    });

    quantityControls.append(decreaseButton, quantity, increaseButton);

    const subTotal = getSubTotal(product.id);

    const subTotalDisplay = document.createElement("span");
    subTotalDisplay.classList.add("cart-item-subtotal");
    subTotalDisplay.textContent = `₹${subTotal}`;

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-cart-button");
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", () => {
      removeFromCart(product.id);
      renderCart();
    });

    cartElement.append(
      name,
      price,
      quantityControls,
      subTotalDisplay,
      removeButton,
    );

    cartItems.append(cartElement);
  });

  const cartSummary = document.createElement("div");
  cartSummary.classList.add("cart-summary");

  const itemCount = document.createElement("p");
  itemCount.classList.add("cart-item-count");
  itemCount.textContent = `Total items: ${getCartItemCount()}`;

  const overallTotal = document.createElement("p");
  overallTotal.classList.add("cart-total");
  overallTotal.textContent = `Total: ₹${getCartSubtotal()}`;

  cartSummary.append(itemCount, overallTotal);

  cartContainer.append(cartItems, cartSummary);
}
