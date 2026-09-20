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

  products.forEach((product) => {
    const cartElement = document.createElement("div");
    const name = document.createElement("p");
    name.textContent = product.name;

    const quantity = document.createElement("p");
    quantity.textContent = `Quantity : ${product.quantity}`;

    //   Subtotal
    const subTotal = getSubTotal(product.id);

    const subTotalDisplay = document.createElement("span");
    subTotalDisplay.textContent = `Sub Total = ${subTotal}`;

    // remove logic
    const removeButton = document.createElement("button");
    removeButton.textContent = "remove";

    removeButton.addEventListener("click", () => {
      removeFromCart(product.id);
      renderCart();
    });

    // increase button
    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";

    increaseButton.addEventListener("click", () => {
      increaseQuantity(product.id);
      renderCart();
    });

    // Decrease button
    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";

    decreaseButton.addEventListener("click", () => {
      decreaseQuantity(product.id);
      renderCart();
    });

    cartElement.append(
      name,
      quantity,
      decreaseButton,
      increaseButton,
      removeButton,
      subTotalDisplay,
    );
    cartContainer.append(cartElement);
  });
  // cart Item Count
  const itemCount = getCartItemCount();

  const totalCartItem = document.createElement("span");
  totalCartItem.textContent = `Total items = ${itemCount}`;

  // Overall sub total
  const overallTotal = getCartSubtotal();

  const overallSubCartTotal = document.createElement("span");
  overallSubCartTotal.textContent = `Total =${overallTotal} `;

  cartContainer.append(totalCartItem, overallSubCartTotal);
}
