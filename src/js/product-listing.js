import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import updateCartCount from "./cartCount.mjs";

async function init() {
  try {
    // Load shared page components
    await loadHeaderFooter();

    const dataSource = new ExternalServices();
    const listElement = document.querySelector(".product-list");
    const title = document.getElementById("categoryTitle");

    // Get URL parameters
    const category = getParam("category");
    const search = getParam("search");

    // Determine whether we're searching or browsing a category
    const searchTerm = search || category || "tents";

    // Create ProductList
    const productList = new ProductList(
      searchTerm,
      dataSource,
      listElement
    );

    // Update page title
    if (search) {
      title.textContent = `Search Results: ${search}`;
    } else {
      const formattedCategory = searchTerm
        .replace(/-/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());

      title.textContent = `Top Products: ${formattedCategory}`;
    }

    // Load products
    await productList.init();

    // Update cart badge
    updateCartCount();
  } catch (err) {
    console.error(err);

    document.querySelector(".product-list").innerHTML = `
      <li class="empty-cart-card">
        <h2>Unable to load products.</h2>
        <p>Please try again later.</p>
      </li>
    `;
  }
}

init();