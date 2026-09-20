import { state } from "../state.js";
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 60000,
    category: "electronics",
    description: "A powerful laptop for everyday work",
  },
  {
    id: 2,
    name: "Headphones",
    price: 3000,
    category: "electronics",
    description: "high quality headphones",
  },
  {
    id: 3,
    name: "Keyboard",
    price: 2000,
    category: "electronics",
    description: "Durable keyboard for office use",
  },
];
export function loadProducts() {
  state.products = products;
}
