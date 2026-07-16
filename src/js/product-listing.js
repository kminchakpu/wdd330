import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import updateCartCount from "./cartCount.mjs";

loadHeaderFooter();

const category = getParam("category") || "tents";

// Update page heading
const title = document.getElementById("categoryTitle");

const formattedCategory = category
  .replace("-", " ")
  .replace(/\b\w/g, (letter) => letter.toUpperCase());

title.textContent = `Top Products: ${formattedCategory}`;

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const productList = new ProductList(
  category,
  dataSource,
  listElement
);

productList.init();
updateCartCount();