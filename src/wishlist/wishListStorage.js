const WISHLIST_KEY = "Wishlist";

export function saveWishlist(wishlist) {
  const wishListArray = [...wishlist];
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishListArray));
}
export function loadWishlist() {
  const stored = localStorage.getItem(WISHLIST_KEY);
  const array = stored ? JSON.parse(stored) : [];
  return new Set(array);
}
