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
  // Safe header checks
  const brandDOM = document.querySelector("h2");
  if (brandDOM) {
    brandDOM.textContent = product.Brand?.Name || product.Brand || "";
  }

  const nameDOM = document.querySelector("h3");
  if (nameDOM) {
    nameDOM.textContent = product.NameWithoutBrand || product.Name;
  }

  // 1. SAFE FALLBACK FOR IMAGES
  const productImage = document.getElementById("productImage");
  if (productImage) {
    const imagePath = product.Images && product.Images.PrimaryLarge
      ? product.Images.PrimaryLarge
      : product.Image;

    productImage.src = imagePath;
    productImage.alt = product.NameWithoutBrand || product.Name;
  }

  // 2. SAFE FALLBACK FOR PRICES
  const finalPrice = Number(product.FinalPrice || product.ListPrice || 0);
  const retailPriceValue = Number(product.SuggestedRetailPrice || product.ListPrice || 0);

  // Determine discount safely
  const isDiscounted = finalPrice < retailPriceValue;

  const discountPercent = isDiscounted
    ? Math.round(((retailPriceValue - finalPrice) / retailPriceValue) * 100)
    : 0;

  // Display discount badge safely
  const badge = document.getElementById("discountBadge");
  if (badge) {
    if (isDiscounted) {
      badge.innerHTML = `${discountPercent}% OFF`;
      badge.style.display = "inline-block";
    } else {
      badge.style.display = "none";
    }
  }

  // Original retail price safely
  const retailPriceDOM = document.getElementById("retailPrice");
  if (retailPriceDOM) {
    if (isDiscounted) {
      retailPriceDOM.innerHTML = `<s>$${retailPriceValue.toFixed(2)}</s>`;
      retailPriceDOM.style.display = "block";
    } else {
      retailPriceDOM.style.display = "none";
    }
  }

  // Final price display safely
  const priceDOM = document.getElementById("productPrice");
  if (priceDOM) {
    priceDOM.textContent = `$${finalPrice.toFixed(2)}`;
  }

  // 3. SAFE FALLBACK FOR COLORS
  const colorDOM = document.getElementById("productColor");
  if (colorDOM) {
    if (product.Colors && product.Colors.length > 0) {
      colorDOM.textContent = product.Colors[0].ColorName;
    } else {
      colorDOM.textContent = "N/A";
    }
  }

  // Description safely
  const descDOM = document.getElementById("productDesc");
  if (descDOM) {
    descDOM.innerHTML = product.DescriptionHtmlSimple || product.Description || "";
  }

  // Add to Cart button dataset safely
  const addToCartBtn = document.getElementById("addToCart");
  if (addToCartBtn) {
    addToCartBtn.dataset.id = product.Id;
  }
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