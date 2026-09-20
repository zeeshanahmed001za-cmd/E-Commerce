import {
  filterProducts,
  searchProducts,
  sortProducts,
} from "./productLogic.js";
import { addToCart } from "../cart/cartLogic.js";
import { state } from "../state.js";
import { renderCart } from "../cart/cartView.js";

const app = document.querySelector("#app");
const searchInput = document.querySelector("#search");
const category = document.querySelector("#category");
const sort = document.querySelector("#sort");

export function renderProducts(products) {
  app.replaceChildren();
  // handle empty results
  if (products.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No products found";
    app.append(message);
  } else {
    products.forEach((productData) => {
      const productElement = document.createElement("div");

      productElement.dataset.id = productData.id;

      productElement.textContent = `${productData.name} - ${productData.price}`;
      productElement.addEventListener("click", () => {
        const product = state.products.find(
          (product) => product.id === Number(productElement.dataset.id),
        );
        renderProductDetails(product);
      });
      app.append(productElement);
    });
  }
}
// product detail list Rendering
function renderProductDetails(product) {
  const details = document.createElement("div");

  const name = document.createElement("h2");
  name.textContent = product.name;

  const price = document.createElement("p");
  price.textContent = `Price : ${product.price}`;

  const category = document.createElement("p");
  category.textContent = ` category : ${product.category}`;

  const description = document.createElement("p");
  description.textContent = product.description;

  // const image = document.createElement("img");
  // image.src = product.image;
  // image.alt = product.name;
  // image.loading = "lazy";

  // back menu
  const backButton = document.createElement("button");
  backButton.textContent = "Back";

  backButton.addEventListener("click", () => {
    updateProducts();
  });
  // Add to cart
  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Add to Cart";

  addToCartButton.addEventListener("click", () => {
    addToCart(product.id);
    renderCart();
  });

  details.append(
    name,
    price,
    category,
    description,
    addToCartButton,
    backButton,
  );
  app.replaceChildren(details);
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
