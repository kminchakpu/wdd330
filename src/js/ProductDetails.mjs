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

  //Check if the item is in the cart before adding. if the item exists, it updates the quantity.
  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    const found = cartItems.find(item => item.Id === this.product.Id);

    if (!found) {
      this.product.quantity = 1;
      cartItems.push(this.product);
    } else {
      changeQnty(found);
    }
    document.querySelector(".cart-card__quantity").innerHTML = `qty: ${quantity}`;
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

//Change the quantity of product in the cart
function changeQnty(product) {
  if (!product.quantity) {
    product.quantity = 1;
  } else {
    product.quantity++;
  }
}