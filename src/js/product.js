import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productID = getParam("product");

// Instantiate and initialize the details view
const productDetailsView = new ProductDetails(productID, dataSource);
productDetailsView.init();