import { state } from "../state.js";

export function renderOrderHistory() {
  const ordersList = document.querySelector("#orders-list");

  ordersList.replaceChildren();

  if (state.orders.length === 0) {
    const message = document.createElement("p");
    message.textContent = " You haven't placed any orders yet";

    ordersList.append(message);
    return;
  }

  state.orders.forEach((order) => {
    const orderElement = document.createElement("article");

    const orderId = document.createElement("p");
    orderId.textContent = `Order ID: ${order.orderId}`;

    const createdAt = document.createElement("p");
    createdAt.textContent = `Placed date: ${new Date(
      order.createdAt,
    ).toLocaleDateString()}`;

    const status = document.createElement("p");
    status.textContent = `Status: ${order.status}`;

    const total = document.createElement("p");
    total.textContent = `Total: ₹${order.subTotal}`;

    orderElement.append(orderId, createdAt, status, total);

    ordersList.append(orderElement);
  });
}
