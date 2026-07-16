import { renderListWithTemplate } from "./utils.mjs";
import { renderCategoryBreadcrumb } from "./breadcrumb.js";

function productCardTemplate(product) {
  const imagePath = product.Images?.PrimaryMedium || "";

  const isDiscounted =
    Number(product.FinalPrice) < Number(product.SuggestedRetailPrice);

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

    this.list = [];
    this.filteredList = [];
  }

  async init() {
    // Load products
    this.list = await this.dataSource.getData(this.category);

    // Copy list for filtering
    this.filteredList = [...this.list];

    // Breadcrumb
    renderCategoryBreadcrumb(this.category, this.list.length);

    // Initial render
    this.renderList(this.filteredList);

    // Enable features
    this.initSorting();
    this.initFilters();
  }

  /* ===========================
      SORTING
  ============================ */

  initSorting() {
    const sortSelect = document.getElementById("sortProducts");

    if (!sortSelect) return;

    sortSelect.addEventListener("change", (e) => {
      this.sortProducts(e.target.value);
    });
  }

  sortProducts(sortBy) {
    let sorted = [...this.filteredList];

    switch (sortBy) {
      case "name-asc":
        sorted.sort((a, b) =>
          a.NameWithoutBrand.localeCompare(b.NameWithoutBrand)
        );
        break;

      case "name-desc":
        sorted.sort((a, b) =>
          b.NameWithoutBrand.localeCompare(a.NameWithoutBrand)
        );
        break;

      case "price-asc":
        sorted.sort(
          (a, b) => Number(a.FinalPrice) - Number(b.FinalPrice)
        );
        break;

      case "price-desc":
        sorted.sort(
          (a, b) => Number(b.FinalPrice) - Number(a.FinalPrice)
        );
        break;

      default:
        sorted = [...this.filteredList];
    }

    this.renderList(sorted);
  }

  /* ===========================
      FILTERING
  ============================ */

  initFilters() {
    const saleFilter = document.getElementById("saleFilter");
    const priceFilter = document.getElementById("priceFilter");

    if (saleFilter) {
      saleFilter.addEventListener("change", () => this.applyFilters());
    }

    if (priceFilter) {
      priceFilter.addEventListener("change", () => this.applyFilters());
    }
  }

  applyFilters() {
    const saleOnly =
      document.getElementById("saleFilter")?.checked;

    const maxPrice =
      document.getElementById("priceFilter")?.value;

    this.filteredList = [...this.list];

    // Sale only
    if (saleOnly) {
      this.filteredList = this.filteredList.filter(
        (product) =>
          Number(product.FinalPrice) <
          Number(product.SuggestedRetailPrice)
      );
    }

    // Maximum price
    if (maxPrice !== "") {
      this.filteredList = this.filteredList.filter(
        (product) =>
          Number(product.FinalPrice) <= Number(maxPrice)
      );
    }

    // Reapply current sort
    const sort =
      document.getElementById("sortProducts")?.value || "default";

    this.sortProducts(sort);
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