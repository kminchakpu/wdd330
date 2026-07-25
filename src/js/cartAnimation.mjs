export default function animateCart() {
  const cart = document.getElementById("cartIcon");

  if (!cart) return;

  // Restart the animation if it's already running
  cart.classList.remove("cart-bounce");

  void cart.offsetWidth;

  cart.classList.add("cart-bounce");

  cart.addEventListener(
    "animationend",
    () => {
      cart.classList.remove("cart-bounce");
    },
    { once: true }
  );
}