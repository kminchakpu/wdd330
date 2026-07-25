import { loadHeaderFooter } from "./utils.mjs";
import updateCartCount from "./cartCount.mjs";

import RegistrationProcess from "./RegistrationProcess.mjs";

async function init() {
  await loadHeaderFooter();
  updateCartCount();
  const registration = new RegistrationProcess();
  registration.init();
}

init();