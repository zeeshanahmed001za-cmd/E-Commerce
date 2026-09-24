import { state } from "../state.js";

export async function loadProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("failed to fetch the products");
    }
    const data = await response.json();

    const apiProducts = data.map((product) => ({
      id: product.id,
      name: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
    }));

    state.products = apiProducts;
  } catch (error) {
    state.error = error.message;
  } finally {
    state.isLoading = false;
  }
}
