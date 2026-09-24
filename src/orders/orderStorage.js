const ORDERS_KEY = "orders";
const CART_KEY = "cart";

export function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}
export function loadOrders() {
  const storedOrders = localStorage.getItem(ORDERS_KEY);

  return storedOrders ? JSON.parse(storedOrders) : [];
}

// saving cart data
export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
export function loadCart() {
  const storedCartItems = localStorage.getItem(CART_KEY);
  return storedCartItems ? JSON.parse(storedCartItems) : [];
}
