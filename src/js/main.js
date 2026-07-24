import { loadHeaderFooter } from "./utils.mjs";
import initRegisterModal from "./registerModal.js";
import initSearch from "./search.js";
import updateCartCount from "./cartCount.mjs";
import Alert from "./Alert.js";

async function init() {
  await loadHeaderFooter();
  await initRegisterModal();
  await initSearch();
  await updateCartCount();

  const alert = new Alert();
  alert.renderAlerts();
}

init();