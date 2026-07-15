import { loadHeaderFooter } from "./utils.mjs";
import updateCartCount from "./cartCount.mjs";
import Alert from "./Alert.js";

loadHeaderFooter();
updateCartCount();

const alert = new Alert();
alert.renderAlerts();