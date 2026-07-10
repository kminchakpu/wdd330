import { getLocalStorage } from "./utils.mjs";
import updateCartCount from "./cartCount.mjs";

function renderCartContents() {
  // Get cart items from localStorage
  const cartItems = getLocalStorage("so-cart") || [];

  const productList = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = document.querySelector(".cart-total");

  // If the cart is empty
  if (cartItems.length === 0) {
    productList.innerHTML = `
      <li class="empty-cart-card">
        <img src="/images/cart.png" alt="Empty Cart" class="empty-cart-logo">
        <h2>Your Cart is Empty</h2>
        <p>It looks like you haven't added any gear yet.</p>
        <a href="/product_listing/index.html" class="continue-shopping">
          Start Shopping
        </a>
      </li>
    `;

    // Keep the footer hidden
    cartFooter.classList.add("hide");
    return;
  }

  // Render the cart items
  const htmlItems = cartItems.map(cartItemTemplate);
  productList.innerHTML = htmlItems.join("");

  // Calculate the total
  const total = cartItems.reduce((sum, item) => {
    return sum + Number(item.FinalPrice);
  }, 0);

  // Display the total
  cartTotal.innerHTML = `Total: <strong>$${total.toFixed(2)}</strong>`;

  // Show the footer
  cartFooter.classList.remove("hide");
}

function cartItemTemplate(item) {
  return `
    <li class="cart-card">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}">
      </a>

      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>

      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${Number(item.FinalPrice).toFixed(2)}</p>
    </li>
  `;
}
renderCartContents();
updateCartCount();