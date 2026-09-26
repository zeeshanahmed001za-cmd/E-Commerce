import { state } from "../state.js";
import { saveWishlist } from "./wishListStorage.js";
// add
export function addToWishList(productId) {
  state.wishList.add(productId);
  saveWishlist(state.wishList);
}

// remove
export function removeFromWishList(productId) {
  state.wishList.delete(productId);
  saveWishlist(state.wishList);
}

// Check existence
export function isInWishList(productId) {
  return state.wishList.has(productId);
}

// get wish list products
export function getWishListProducts() {
  return [...state.wishList].map((id) =>
    state.products.find((product) => product.id === id),
  );
}
