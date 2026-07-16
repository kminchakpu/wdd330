<<<<<<< HEAD
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
=======
import { loadHeaderFooter } from "./utils.mjs";
import updateCartCount from "./cartCount.mjs";
import Alert from "./Alert.js";

loadHeaderFooter();
updateCartCount();

const alert = new Alert();
alert.renderAlerts();
>>>>>>> b981eb30dd3830253c0ea1dfdfee97d77a645f6f
