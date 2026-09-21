import { addToCart } from "../cart/cartLogic.js";
import { renderCart } from "../cart/cartView.js";
import { updateWishlistUI } from "../products/productView.js";
import { getWishListProducts, removeFromWishList } from "./wishListLogic.js";

export function renderWishListProducts() {
  const wishListContainer = document.querySelector("#wishList");

  const wishListProducts = getWishListProducts();

  wishListContainer.replaceChildren();

  if (wishListProducts.length === 0) {
    const message = document.createElement("p");

    message.classList.add("message");
    message.textContent = "Your Wish List is empty";

    wishListContainer.append(message);
    return;
  }

  wishListProducts.forEach((product) => {
    const wLProduct = document.createElement("div");
    wLProduct.classList.add("wishlist-product");

    const name = document.createElement("h3");
    name.classList.add("wishlist-name");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.classList.add("wishlist-price");
    price.textContent = `₹${product.price}`;

    const wishListControls = document.createElement("div");
    wishListControls.classList.add("wishlist-controls");

    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("wishlist-add-to-cart");
    addToCartButton.textContent = "Add to Cart";

    addToCartButton.addEventListener("click", () => {
      addToCart(product.id);
      renderCart();
    });

    const removeButton = document.createElement("button");
    removeButton.classList.add("wishlist-remove");
    removeButton.textContent = "🗑️";

    removeButton.addEventListener("click", () => {
      removeFromWishList(product.id);

      updateWishlistUI(product.id);
      renderWishListProducts();
    });
    wishListControls.append(addToCartButton, removeButton);

    wLProduct.append(name, price, wishListControls);

    wishListContainer.append(wLProduct);
  });
}
