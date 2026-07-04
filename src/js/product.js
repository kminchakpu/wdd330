// Import getLocalStorage from utils.mjs
import { setLocalStorage, getLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

const productId = getParam('product');

console.log(dataSource.findProductById(productId));

function addProductToCart(product) {
  // 1. Get whatever is currently stored
  const currentCart = getLocalStorage("so-cart");

  // 2. Ensure we are working with a valid array list
  let cartArray = [];
  if (Array.isArray(currentCart)) {
    cartArray = currentCart;
  } else if (currentCart) {
    // If it's an old single object, wrap it in an array so we don't lose it
    cartArray = [currentCart];
  }

  // 3. Push the new product into our verified array list
  cartArray.push(product);

  // 4. Save the clean list back to localStorage
  setLocalStorage("so-cart", cartArray);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

/*

After the index.html file is able to call each product ID in urlsearchparams
then remove code and use the one below

import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';


const productId = getParam('product');
const dataSource = new ProductData('tents');

const product = new ProductDetails(productId, dataSource);
product.init();
*/
