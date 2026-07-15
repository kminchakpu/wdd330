import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {

  let imagePath = product.Images && product.Images.PrimaryMedium
    ? product.Images.PrimaryMedium
    : product.Image;

  // Determine if the product is discounted
  const isDiscounted =
    Number(product.FinalPrice) < Number(product.SuggestedRetailPrice);

  // Calculate the discount percentage
  const discountPercent = isDiscounted
    ? Math.round(
      ((Number(product.SuggestedRetailPrice) - Number(product.FinalPrice)) /
        Number(product.SuggestedRetailPrice)) *
      100
    )
    : 0;

  return `
    <li class="product-card">
      ${isDiscounted
      ? `<span class="discount-badge">${discountPercent}% OFF</span>`
      : ""
    }

      <a href="../product_pages/index.html?product=${product.Id}">
        <img
          src="${imagePath}"
          alt="Image of ${product.Name}"
          loading="lazy"
        >

        <h2 class="card__brand">${product.Brand.Name}</h2>

        <h3 class="card__name">${product.NameWithoutBrand}</h3>

        ${isDiscounted
      ? `
              <p class="product-card__retail-price">
                <s>$${Number(product.SuggestedRetailPrice).toFixed(2)}</s>
              </p>
            `
      : ""
    }

        <p class="product-card__price">$${Number(product.FinalPrice).toFixed(
      2
    )}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // 2. FIXED FOR API: Pass 'this.category' to retrieve the correct database category
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);

    // 3. NEW: Call this helper to dynamically update the title on screen
    this.updateTitle();
  }

  renderList(list) {
    // Clear out any old content first
    this.listElement.innerHTML = "";

    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true
    );
  }

  // 4. NEW: Helper to dynamically change "Top Products" to "Top Products: Tents"
  updateTitle() {
    const titleElement = document.getElementById("category-title");
    if (titleElement) {
      // Format the category name nicely (e.g., "sleeping-bags" -> "Sleeping Bags")
      const formattedCategory = this.category
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      titleElement.textContent = `Top Products: ${formattedCategory}`;
    }
  }
}