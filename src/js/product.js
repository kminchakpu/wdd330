import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import updateCartCount from "./cartCount.mjs";

loadHeaderFooter();

const productID = getParam("product");
const dataSource = new ProductData();

const product = new ProductDetails(productID, dataSource);

product.init();

updateCartCount();

// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
