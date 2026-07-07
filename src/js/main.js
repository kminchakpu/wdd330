import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// 1. Initialize data fetching for tents category
const dataSource = new ProductData("tents");

// 2. Target the HTML element list container 
const listElement = document.querySelector(".product-list");

// 3. Instantiate our new reusable ProductList class components
const productList = new ProductList("tents", dataSource, listElement);

// 4. Run initialization to fetch data and dynamically print elements
productList.init();