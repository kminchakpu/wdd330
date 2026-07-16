<<<<<<< HEAD
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import updateCartCount from "./cartCount.mjs";

function renderCartContents() {
  // Get cart items
=======
import {
  loadHeaderFooter,
  getLocalStorage,
  setLocalStorage,
} from "./utils.mjs";
import updateCartCount from "./cartCount.mjs";

function renderCartContents() {
>>>>>>> b981eb30dd3830253c0ea1dfdfee97d77a645f6f
  const cartItems = getLocalStorage("so-cart") || [];

  const productList = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = document.querySelector(".cart-total");

  // Empty cart
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

    cartFooter.classList.add("hide");
    updateCartCount();
    return;
  }

<<<<<<< HEAD
  // Render items
=======
  // Render cart items
>>>>>>> b981eb30dd3830253c0ea1dfdfee97d77a645f6f
  productList.innerHTML = cartItems.map(cartItemTemplate).join("");

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.FinalPrice),
<<<<<<< HEAD
    0,
=======
    0
>>>>>>> b981eb30dd3830253c0ea1dfdfee97d77a645f6f
  );

  cartTotal.innerHTML = `Total: <strong>$${total.toFixed(2)}</strong>`;
  cartFooter.classList.remove("hide");

<<<<<<< HEAD
  // Attach listeners to remove buttons
=======
  // Attach remove listeners
>>>>>>> b981eb30dd3830253c0ea1dfdfee97d77a645f6f
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", removeItemFromCart);
  });

  updateCartCount();
}

function cartItemTemplate(item) {
  return `
    <li class="cart-card">

<<<<<<< HEAD
      <span class="remove-item" data-id="${item.Id}" title="Remove item">
        &times;
      </span>

      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}">
      </a>

      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>

      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${Number(item.FinalPrice).toFixed(2)}</p>
=======
      <span
        class="remove-item"
        data-id="${item.Id}"
        title="Remove item"
      >
        &times;
      </span>

      <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
        <img
          src="${item.Images?.PrimarySmall || item.Images?.PrimaryMedium || ""}"
          alt="${item.Name}"
          loading="lazy"
        >
      </a>

      <a href="/product_pages/index.html?product=${item.Id}">
        <h2 class="card__name">${item.NameWithoutBrand}</h2>
      </a>

      <p class="cart-card__color">
        ${item.Colors?.[0]?.ColorName || "N/A"}
      </p>

      <p class="cart-card__quantity">
        qty: 1
      </p>

      <p class="cart-card__price">
        $${Number(item.FinalPrice).toFixed(2)}
      </p>

>>>>>>> b981eb30dd3830253c0ea1dfdfee97d77a645f6f
    </li>
  `;
}

function removeItemFromCart(event) {
  const id = event.target.dataset.id;

  let cartItems = getLocalStorage("so-cart") || [];

<<<<<<< HEAD
  // Remove only the first matching item
  const index = cartItems.findIndex((item) => item.Id == id);
=======
  const index = cartItems.findIndex((item) => item.Id === id);
>>>>>>> b981eb30dd3830253c0ea1dfdfee97d77a645f6f

  if (index !== -1) {
    cartItems.splice(index, 1);
  }

  setLocalStorage("so-cart", cartItems);

  renderCartContents();
}

<<<<<<< HEAD
renderCartContents();
=======
loadHeaderFooter();
renderCartContents();
>>>>>>> b981eb30dd3830253c0ea1dfdfee97d77a645f6f
