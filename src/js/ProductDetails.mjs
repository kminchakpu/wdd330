import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import updateCartCount from "./cartCount.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    updateCartCount();
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
<<<<<<< HEAD
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  // Determine discount
=======
  // Brand
  document.querySelector("h2").textContent = product.Brand.Name;

  // Product Name
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  // Product Image (API)
  const productImage = document.getElementById("productImage");
  productImage.src = product.Images.PrimaryLarge;
  productImage.alt = product.Name;

  // Discount
>>>>>>> b981eb30dd3830253c0ea1dfdfee97d77a645f6f
  const isDiscounted =
    Number(product.FinalPrice) < Number(product.SuggestedRetailPrice);

  const discountPercent = isDiscounted
    ? Math.round(
<<<<<<< HEAD
        ((product.SuggestedRetailPrice - product.FinalPrice) /
          product.SuggestedRetailPrice) *
=======
        ((Number(product.SuggestedRetailPrice) - Number(product.FinalPrice)) /
          Number(product.SuggestedRetailPrice)) *
>>>>>>> b981eb30dd3830253c0ea1dfdfee97d77a645f6f
          100
      )
    : 0;

<<<<<<< HEAD
  // Display discount badge
  const badge = document.getElementById("discountBadge");

  if (isDiscounted) {
    badge.innerHTML = `${discountPercent}% OFF`;
=======
  // Discount Badge
  const badge = document.getElementById("discountBadge");

  if (isDiscounted) {
    badge.textContent = `${discountPercent}% OFF`;
>>>>>>> b981eb30dd3830253c0ea1dfdfee97d77a645f6f
    badge.style.display = "inline-block";
  } else {
    badge.style.display = "none";
  }

<<<<<<< HEAD
  // Original retail price
  const retailPrice = document.getElementById("retailPrice");

  if (isDiscounted) {
    retailPrice.innerHTML = `<s>$${product.SuggestedRetailPrice.toFixed(2)}</s>`;
=======
  // Retail Price
  const retailPrice = document.getElementById("retailPrice");

  if (isDiscounted) {
    retailPrice.innerHTML = `<s>$${Number(
      product.SuggestedRetailPrice
    ).toFixed(2)}</s>`;
>>>>>>> b981eb30dd3830253c0ea1dfdfee97d77a645f6f
    retailPrice.style.display = "block";
  } else {
    retailPrice.style.display = "none";
  }

<<<<<<< HEAD
  // Final price
  document.getElementById(
    "productPrice"
  ).textContent = `$${product.FinalPrice.toFixed(2)}`;

  document.getElementById("productColor").textContent =
    product.Colors[0].ColorName;

  document.getElementById("productDesc").innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}

// ************* Alternative Display Product Details Method *******************
// function productDetailsTemplate(product) {
//   return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
//     <h2 class="divider">${product.NameWithoutBrand}</h2>
//     <img
//       class="divider"
//       src="${product.Image}"
//       alt="${product.NameWithoutBrand}"
//     />
//     <p class="product-card__price">$${product.FinalPrice}</p>
//     <p class="product__color">${product.Colors[0].ColorName}</p>
//     <p class="product__description">
//     ${product.DescriptionHtmlSimple}
//     </p>
//     <div class="product-detail__add">
//       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//     </div></section>`;
// }
=======
  // Final Price
  document.getElementById(
    "productPrice"
  ).textContent = `$${Number(product.FinalPrice).toFixed(2)}`;

  // Color
  document.getElementById("productColor").textContent =
    product.Colors?.[0]?.ColorName || "N/A";

  // Description
  document.getElementById("productDesc").innerHTML =
    product.DescriptionHtmlSimple;

  // Add to Cart Button
  document.getElementById("addToCart").dataset.id = product.Id;
}
>>>>>>> b981eb30dd3830253c0ea1dfdfee97d77a645f6f
