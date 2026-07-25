import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import animateCart from "./cartAnimation.mjs";
import updateCartCount from "./cartCount.mjs";
import { renderProductBreadcrumb } from "./breadcrumb.js";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;

    // Default selected color
    this.selectedColor = null;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    renderProductBreadcrumb(this.product.Category);

    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];

    // Create a copy so we don't modify the original product object
    const productToAdd = {
      ...this.product,
      quantity: 1,
      selectedColor: this.selectedColor
    };

    const existingItem = cartItems.find(
      (item) =>
        item.Id === productToAdd.Id &&
        item.selectedColor?.ColorName ===
          productToAdd.selectedColor?.ColorName
    );

    if (existingItem) {
      existingItem.quantity =
        (existingItem.quantity || 1) + 1;
    } else {
      cartItems.push(productToAdd);
    }

    setLocalStorage("so-cart", cartItems);

    updateCartCount();

    animateCart();
  }

  renderProductDetails() {
    productDetailsTemplate(this.product, this);
  }
}

function productDetailsTemplate(product, instance) {

  // Brand
  document.querySelector("h2").textContent =
    product.Brand.Name;

  // Name
  document.querySelector("h3").textContent =
    product.NameWithoutBrand;

  // Main image
  const productImage =
    document.getElementById("productImage");

  productImage.src =
    product.Images.PrimaryLarge;

  productImage.alt =
    product.Name;

  // Discount
  const isDiscounted =
    Number(product.FinalPrice) <
    Number(product.SuggestedRetailPrice);

  const badge =
    document.getElementById("discountBadge");

  if (isDiscounted) {

    const percent = Math.round(
      ((Number(product.SuggestedRetailPrice) -
        Number(product.FinalPrice)) /
        Number(product.SuggestedRetailPrice)) *
        100
    );

    badge.textContent = `${percent}% OFF`;

    badge.style.display = "inline-block";

  } else {

    badge.style.display = "none";

  }

  // Retail price
  const retail =
    document.getElementById("retailPrice");

  if (isDiscounted) {

    retail.innerHTML = `<s>$${Number(
      product.SuggestedRetailPrice
    ).toFixed(2)}</s>`;

    retail.style.display = "block";

  } else {

    retail.style.display = "none";

  }

  // Final price
  document.getElementById(
    "productPrice"
  ).textContent =
    `$${Number(product.FinalPrice).toFixed(2)}`;

  // Description
  document.getElementById(
    "productDesc"
  ).innerHTML =
    product.DescriptionHtmlSimple;

  // -----------------------------
  // COLORS
  // -----------------------------

  const colorContainer =
    document.getElementById("colorSwatches");

  colorContainer.innerHTML = "";

  if (
    product.Colors &&
    product.Colors.length > 0
  ) {

    // Default selection
    instance.selectedColor =
      product.Colors[0];

    document.getElementById(
      "productColor"
    ).textContent =
      instance.selectedColor.ColorName;

    product.Colors.forEach((color, index) => {

      const img =
        document.createElement("img");

      img.src =
        color.ColorChipImageSrc;

      img.alt =
        color.ColorName;

      img.title =
        color.ColorName;

      img.classList.add("color-swatch");

      if (index === 0) {
        img.classList.add("selected");
      }

      img.addEventListener("click", () => {

        document
          .querySelectorAll(".color-swatch")
          .forEach((chip) =>
            chip.classList.remove("selected")
          );

        img.classList.add("selected");

        instance.selectedColor = color;

        document.getElementById(
          "productColor"
        ).textContent =
          color.ColorName;

        if (color.ColorPreviewImageSrc) {
          productImage.src =
            color.ColorPreviewImageSrc;
        }

      });

      colorContainer.appendChild(img);

    });

  } else {

    document.getElementById(
      "productColor"
    ).textContent = "N/A";

  }

  // Add to Cart
  document.getElementById("addToCart").dataset.id =
    product.Id;
}