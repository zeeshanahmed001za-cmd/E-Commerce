import { state } from "../state.js";
import { getCartSubtotal } from "../cart/cartLogic.js";

export function createOrder(checkoutData) {
  const order = {
    orderId: crypto.randomUUID(),

    createdAt: new Date().toISOString(),

    customer: {
      fullName: checkoutData.fullName,
      email: checkoutData.email,
      phone: checkoutData.phone,
    },

    shipping: {
      address: checkoutData.address,
      city: checkoutData.city,
      state: checkoutData.state,
      postalCode: checkoutData.postalCode,
      country: checkoutData.country,
    },

    paymentMethod: checkoutData.paymentMethod,

    items: [...state.cart],

    subTotal: getCartSubtotal(),

    status: "placed",
  };

  return order;
}

// saving orders
export function saveOrder(order) {
  state.orders.push(order);
}
