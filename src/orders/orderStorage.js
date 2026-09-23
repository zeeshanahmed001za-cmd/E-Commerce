const ORDERS_KEY = "orders";

export function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}
export function loadOrders() {
  const storedOrders = localStorage.getItem(ORDERS_KEY);

  return storedOrders ? JSON.parse(storedOrders) : [];
}
