import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import updateCartCount from "./cartCount.mjs";

loadHeaderFooter();

const category = getParam("category") || "tents";
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, listElement);

productList.init();
updateCartCount();
