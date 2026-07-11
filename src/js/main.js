import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import updateCartCount from "./cartCount.mjs";
import Alert from "./Alert.js";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, listElement);
productList.init();
updateCartCount();

const alert = new Alert();
alert.renderAlerts();
