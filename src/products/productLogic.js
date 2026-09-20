// processing data and returning results
export function searchProducts(products, query) {
  return products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );
}

// Filter products
export function filterProducts(products, category) {
  if (category === "all") {
    return products;
  }
  return products.filter((product) => product.category === category);
}

// Sorting products
export function sortProducts(products, sortBy) {
  const sortedProducts = [...products];

  if (sortBy === "default") return products;

  if (sortBy === "price-asc") {
    return sortedProducts.sort((a, b) => a.price - b.price);
  }
  if (sortBy === "price-desc") {
    return sortedProducts.sort((a, b) => b.price - a.price);
  }
}
