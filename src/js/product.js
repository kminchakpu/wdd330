import { loadHeaderFooter, getParam } from "./utils.mjs";
import initSearch from "./search.js";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import updateCartCount from "./cartCount.mjs";

async function init() {
  try {
    // Load shared page components
    await loadHeaderFooter();

    // Initialize search bar
    await initSearch();

    // Get product id from URL
    const productID = getParam("product");

    // Create data source
    const dataSource = new ExternalServices();

    // Create ProductDetails instance
    const product = new ProductDetails(productID, dataSource);

    // Load product
    await product.init();

    // Update cart badge
    updateCartCount();
  } catch (err) {
    console.error(err);

    document.querySelector("main").innerHTML = `
      <section class="error-message">
        <h2>Unable to load product.</h2>
        <p>Please try again later.</p>
      </section>
    `;
  }
}

init();
