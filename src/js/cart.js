import {
  loadHeaderFooter,
  getLocalStorage,
  setLocalStorage,
} from "./utils.mjs";

import initSearch from "./search.js";
import updateCartCount from "./cartCount.mjs";

async function init() {
  await loadHeaderFooter();
  await initSearch();

  renderCartContents();
}

init();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  const productList = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = document.querySelector(".cart-total");

  // Empty cart
  if (cartItems.length === 0) {
    productList.innerHTML = `
      <li class="empty-cart-card">
        <img
          src="/images/cart.png"
          alt="Empty Cart"
          class="empty-cart-logo"
        >

        <h2>Your Cart is Empty</h2>

        <p>
          It looks like you haven't added any gear yet.
        </p>

        <a
          href="../index.html"
          class="continue-shopping"
        >
          Start Shopping
        </a>
      </li>
    `;

    cartFooter.classList.add("hide");

    updateCartCount();

    return;
  }

  // Render cart
  productList.innerHTML =
    cartItems.map(cartItemTemplate).join("");

  // Total
  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.FinalPrice) *
        (item.quantity || 1),
    0
  );

  cartTotal.innerHTML = `
    Total:
    <strong>$${total.toFixed(2)}</strong>
  `;

  cartFooter.classList.remove("hide");

  document
    .querySelectorAll(".remove-item")
    .forEach((button) => {
      button.addEventListener(
        "click",
        removeItemFromCart
      );
    });

  updateCartCount();
}

function cartItemTemplate(item) {

  const quantity =
    item.quantity || 1;

  const lineTotal =
    Number(item.FinalPrice) *
    quantity;

  return `
    <li class="cart-card">

      <span
        class="remove-item"
        data-id="${item.Id}"
        data-color="${item.selectedColor?.ColorName || ""}"
        title="Remove one"
      >
        &times;
      </span>

      <a
        href="/product_pages/index.html?product=${item.Id}"
        class="cart-card__image"
      >
        <img
          src="${item.Images?.PrimarySmall ||
            item.Images?.PrimaryMedium ||
            ""}"
          alt="${item.Name}"
          loading="lazy"
        >
      </a>

      <a href="/product_pages/index.html?product=${item.Id}">
        <h2 class="card__name">
          ${item.NameWithoutBrand}
        </h2>
      </a>

      <p class="cart-card__color">
        Color:
        <strong>
          ${item.selectedColor?.ColorName || "N/A"}
        </strong>
      </p>

      <p class="cart-card__quantity">
        Qty: ${quantity}
      </p>

      <p class="cart-card__price">
        $${lineTotal.toFixed(2)}
      </p>

    </li>
  `;
}

function removeItemFromCart(event) {

  const id =
    event.target.dataset.id;

  const color =
    event.target.dataset.color;

  let cartItems =
    getLocalStorage("so-cart") || [];

  const index =
    cartItems.findIndex(
      (item) =>
        item.Id === id &&
        (item.selectedColor?.ColorName || "") === color
    );

  if (index !== -1) {

    if (
      (cartItems[index].quantity || 1) > 1
    ) {

      cartItems[index].quantity--;

    } else {

      cartItems.splice(index, 1);

    }

  }

  setLocalStorage("so-cart", cartItems);

  renderCartContents();
}