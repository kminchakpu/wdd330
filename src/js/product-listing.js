import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import updateCartCount from "./cartCount.mjs";

async function init() {
  await loadHeaderFooter();

  const dataSource = new ProductData();
  const listElement = document.querySelector(".product-list");
  const title = document.getElementById("categoryTitle");

  // Get URL parameters
  const category = getParam("category");
  const search = getParam("search");

  // Decide what to search for
  const searchTerm = search || category || "tents";

  // Create the product list
  const productList = new ProductList(searchTerm, dataSource, listElement);

  // Update the page title
  if (search) {
    title.textContent = `Search Results: ${search}`;
  } else {
    const formattedCategory = searchTerm
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());

    title.textContent = `Top Products: ${formattedCategory}`;
  }

  // Load products
  productList.init();

  // Update cart count
  updateCartCount();
}

init();