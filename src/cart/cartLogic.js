// Cart business rules/logic
import { state } from "../state.js";
import { saveCart } from "../orders/orderStorage.js";

export function addToCart(productId) {
  const cartItem = state.cart.find((item) => item.productId === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    state.cart.push({
      productId: productId,
      quantity: 1,
    });
  }
  saveCart(state.cart);
}

// remove product from cart logic
export function removeFromCart(productId) {
  state.cart = state.cart.filter((cartItem) => {
    return cartItem.productId !== productId;
  });
  saveCart(state.cart);
}

// increase quantity logic
export function increaseQuantity(productId) {
  const cartItem = state.cart.find((item) => item.productId === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  }
  saveCart(state.cart);
}

// Decrease quantity logic
export function decreaseQuantity(productId) {
  const cartItem = state.cart.find((item) => item.productId === productId);

  if (cartItem.quantity > 1) {
    cartItem.quantity -= 1;
    saveCart(state.cart);
  } else {
    removeFromCart(productId);
  }
}

// Subtotal logic
export function getSubTotal(productId) {
  const cartItem = state.cart.find((item) => item.productId === productId);
  const product = state.products.find((item) => item.id === productId);

  const subTotal = product.price * cartItem.quantity;
  return subTotal;
}

// Overall sub total
export function getCartSubtotal() {
  const cartSubtotal = state.cart.reduce((total, cartItem) => {
    return total + getSubTotal(cartItem.productId);
  }, 0);
  return cartSubtotal;
}

// Get the count of total items in the cart
export function getCartItemCount() {
  const cartItemCount = state.cart.reduce((count, cartItem) => {
    return count + cartItem.quantity;
  }, 0);
  return cartItemCount;
}

// clearing the cart
export function clearCart() {
  state.cart = [];
  saveCart(state.cart);
}
