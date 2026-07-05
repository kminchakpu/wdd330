import { getParam, getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();

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
