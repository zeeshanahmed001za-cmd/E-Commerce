import { loadOrders } from "./orders/orderStorage.js";

export const state = {
  products: [],
  cart: [],
  wishList: new Set(),
  orders: loadOrders(),
};
