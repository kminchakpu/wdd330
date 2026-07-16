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
  // Brand
  document.querySelector("h2").textContent = product.Brand.Name;

  // Product Name
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  // Product Image (API)
  const productImage = document.getElementById("productImage");
  productImage.src = product.Images.PrimaryLarge;
  productImage.alt = product.Name;

  // Discount
  const isDiscounted =
    Number(product.FinalPrice) < Number(product.SuggestedRetailPrice);

  const discountPercent = isDiscounted
    ? Math.round(
        ((Number(product.SuggestedRetailPrice) - Number(product.FinalPrice)) /
          Number(product.SuggestedRetailPrice)) *
          100
      )
    : 0;

  // Discount Badge
  const badge = document.getElementById("discountBadge");

  if (isDiscounted) {
    badge.textContent = `${discountPercent}% OFF`;
    badge.style.display = "inline-block";
  } else {
    badge.style.display = "none";
  }

  // Retail Price
  const retailPrice = document.getElementById("retailPrice");

  if (isDiscounted) {
    retailPrice.innerHTML = `<s>$${Number(
      product.SuggestedRetailPrice
    ).toFixed(2)}</s>`;
    retailPrice.style.display = "block";
  } else {
    retailPrice.style.display = "none";
  }

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