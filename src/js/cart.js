import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  // Get the cart items from localStorage.
  // If nothing is stored, use an empty array instead.
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");

  // Display a message if the cart is empty.
  if (cartItems.length === 0) {
    productList.innerHTML = `
      <li class="cart-card divider">
        <p>Your cart is empty.</p>
      </li>
    `;
    return;
  }

  // Render the cart items.
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${item.Image}"
          alt="${item.Name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
}

renderCartContents();