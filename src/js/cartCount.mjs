import { getLocalStorage } from "./utils.mjs";

export default function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];

  const badge = document.querySelector(".cart-count");

  if (!badge) return;

  badge.textContent = cartItems.length;

  if (cartItems.length > 0) {
    badge.classList.add("show");
  } else {
    badge.classList.remove("show");
  }
}