import {
  filterProducts,
  searchProducts,
  sortProducts,
} from "./productLogic.js";
import { addToCart } from "../cart/cartLogic.js";
import { state } from "../state.js";
import { renderCart } from "../cart/cartView.js";
import {
  addToWishList,
  removeFromWishList,
  isInWishList,
} from "../wishlist/wishListLogic.js";
import { renderWishListProducts } from "../wishlist/wishListView.js";

const productDisplay = document.querySelector("#product-list");
const searchInput = document.querySelector("#search");
const category = document.querySelector("#category");
const sort = document.querySelector("#sort");

let currentWishListButton = null;
let currentProductId = null;

export function renderProducts(products) {
  productDisplay.replaceChildren();
  // handle empty results
  if (state.isLoading) {
    const message = document.createElement("p");
    message.textContent = "Loading products...";
    productDisplay.append(message);
  } else if (state.error) {
    const message = document.createElement("p");
    message.textContent = state.error;
    productDisplay.append(message);
  } else if (products.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No products found";
    productDisplay.append(message);
  } else {
    products.forEach((productData) => {
      const productElement = document.createElement("div");

      productElement.dataset.id = productData.id;

      // product name
      const name = document.createElement("h3");
      name.classList.add("product-name");
      name.textContent = productData.name;

      // product price
      const price = document.createElement("p");
      price.classList.add("product-price");
      price.textContent = `₹${productData.price}`;
      productElement.append(name, price);

      productElement.addEventListener("click", () => {
        const product = state.products.find(
          (product) => product.id === Number(productElement.dataset.id),
        );
        renderProductDetails(product);
      });
      productDisplay.append(productElement);
    });
  }
}

// product detail list Rendering
function renderProductDetails(product) {
  const details = document.createElement("div");
  details.classList.add("product-details");

  // Header
  const detailsHeader = document.createElement("div");
  detailsHeader.classList.add("details-header");

  const name = document.createElement("h2");
  name.classList.add("product-name");
  name.textContent = product.name;

  const WishListToggleButton = document.createElement("button");
  WishListToggleButton.classList.add("wishlist-button");

  function updatewishListButton() {
    WishListToggleButton.textContent = isInWishList(product.id) ? "❤️" : "♡";
  }

  WishListToggleButton.addEventListener("click", () => {
    if (isInWishList(product.id)) {
      removeFromWishList(product.id);
    } else {
      addToWishList(product.id);
    }

    updatewishListButton();
    renderWishListProducts();
  });

  updatewishListButton();
  currentWishListButton = WishListToggleButton;
  currentProductId = product.id;

  detailsHeader.append(name, WishListToggleButton);

  // Product information
  const price = document.createElement("p");
  price.classList.add("product-price");
  price.textContent = `₹${product.price}`;

  const category = document.createElement("p");
  category.classList.add("product-category");
  category.textContent = product.category;

  const description = document.createElement("p");
  description.classList.add("product-description");
  description.textContent = product.description;

  // Actions
  const detailsActions = document.createElement("div");
  detailsActions.classList.add("details-actions");

  const addToCartButton = document.createElement("button");
  addToCartButton.classList.add("add-to-cart-button");
  addToCartButton.textContent = "Add to Cart";

  addToCartButton.addEventListener("click", () => {
    addToCart(product.id);
    renderCart();
  });

  const backButton = document.createElement("button");
  backButton.classList.add("back-button");
  backButton.textContent = "Back";

  backButton.addEventListener("click", () => {
    updateProducts();
  });

  detailsActions.append(addToCartButton, backButton);

  details.append(detailsHeader, price, category, description, detailsActions);

  productDisplay.replaceChildren(details);
}
export function updateWishlistUI(productId) {
  if (currentProductId !== productId) return;
  currentWishListButton.textContent = isInWishList(productId) ? "❤️" : "♡";
}
// Coordinator
function updateProducts() {
  const searchResults = searchProducts(state.products, searchInput.value);
  const filteredResults = filterProducts(searchResults, category.value);

  const sortedResults = sortProducts(filteredResults, sort.value);
  renderProducts(sortedResults);
}

searchInput.addEventListener("input", updateProducts);
category.addEventListener("change", updateProducts);
sort.addEventListener("change", updateProducts);
