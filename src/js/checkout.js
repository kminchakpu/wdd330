import { loadHeaderFooter } from "./utils.mjs";
import updateCartCount from "./cartCount.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

updateCartCount();

const checkout = new CheckoutProcess();

checkout.init();