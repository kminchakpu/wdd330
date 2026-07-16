import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  // Use the image returned by the API
  const imagePath = product.Images?.PrimaryMedium || "";

  // Check if the product is discounted
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
      ${
        isDiscounted
          ? `<span class="discount-badge">${discountPercent}% OFF</span>`
          : ""
      }

      <a href="/product_pages/index.html?product=${product.Id}">
        <img
          src="${imagePath}"
          alt="${product.Name}"
          loading="lazy"
        >

        <h2 class="card__brand">${product.Brand.Name}</h2>

        <h3 class="card__name">${product.NameWithoutBrand}</h3>

        ${
          isDiscounted
            ? `
              <p class="product-card__retail-price">
                <s>$${Number(product.SuggestedRetailPrice).toFixed(2)}</s>
              </p>
            `
            : ""
        }

        <p class="product-card__price">
          $${Number(product.FinalPrice).toFixed(2)}
        </p>
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
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true
    );
  }
}