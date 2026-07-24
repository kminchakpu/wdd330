import {
  getLocalStorage,
  setLocalStorage,
  formDataToJSON,
} from "./utils.mjs";

import updateCartCount from "./cartCount.mjs";
import ExternalServices from "./ExternalServices.mjs";

import {
  validateRequired,
  validateEmail,
  validatePhone,
  validateCard,
  validateExpiration,
  validateCVV,
  validateZip,
} from "./validation.js";

export default class CheckoutProcess {
  constructor(cartKey) {
    this.cartKey = cartKey;
    this.cartItems = [];
    this.services = new ExternalServices();
  }

  /**
   * Initialize checkout page
   */
  init() {
    this.cartItems = getLocalStorage(this.cartKey) || [];

    this.calculateOrderTotals();

    this.enableLiveValidation();

    const form = document.getElementById("checkoutForm");

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (this.validateForm()) {
          this.checkout(form);
        }
      });
    }
  }

  /**
   * Live validation
   */
  enableLiveValidation() {
    document
      .getElementById("fname")
      .addEventListener("blur", (e) => validateRequired(e.target));

    document
      .getElementById("lname")
      .addEventListener("blur", (e) => validateRequired(e.target));

    document
      .getElementById("street")
      .addEventListener("blur", (e) => validateRequired(e.target));

    document
      .getElementById("city")
      .addEventListener("blur", (e) => validateRequired(e.target));

    document
      .getElementById("state")
      .addEventListener("blur", (e) => validateRequired(e.target));

    document
      .getElementById("email")
      .addEventListener("blur", (e) => validateEmail(e.target));

    document
      .getElementById("phone")
      .addEventListener("blur", (e) => validatePhone(e.target));

    document
      .getElementById("zip")
      .addEventListener("blur", (e) => validateZip(e.target));

    document
      .getElementById("cardNumber")
      .addEventListener("blur", (e) => validateCard(e.target));

    document
      .getElementById("expiration")
      .addEventListener("blur", (e) => validateExpiration(e.target));

    document
      .getElementById("code")
      .addEventListener("blur", (e) => validateCVV(e.target));
  }

  /**
   * Validate entire form
   */
  validateForm() {
    return (
      validateRequired(document.getElementById("fname")) &&
      validateRequired(document.getElementById("lname")) &&
      validateRequired(document.getElementById("street")) &&
      validateRequired(document.getElementById("city")) &&
      validateRequired(document.getElementById("state")) &&
      validateEmail(document.getElementById("email")) &&
      validatePhone(document.getElementById("phone")) &&
      validateZip(document.getElementById("zip")) &&
      validateCard(document.getElementById("cardNumber")) &&
      validateExpiration(document.getElementById("expiration")) &&
      validateCVV(document.getElementById("code"))
    );
  }

  /**
   * Calculate subtotal
   */
  calculateSubtotal() {
    return this.cartItems.reduce(
      (sum, item) =>
        sum + Number(item.FinalPrice) * (item.quantity || 1),
      0
    );
  }

  /**
   * Calculate shipping
   */
  calculateShipping() {
    if (this.cartItems.length === 0) return 0;

    return 10 + (this.cartItems.length - 1) * 2;
  }

  /**
   * Calculate tax
   */
  calculateTax(subtotal) {
    return subtotal * 0.06;
  }

  /**
   * Display totals
   */
  calculateOrderTotals() {
    const subtotal = this.calculateSubtotal();
    const shipping = this.calculateShipping();
    const tax = Number(this.calculateTax(subtotal).toFixed(2));
    const total = Number((subtotal + shipping + tax).toFixed(2));

    document.getElementById("itemCount").textContent =
      this.cartItems.length;

    document.getElementById("subtotal").textContent =
      `$${subtotal.toFixed(2)}`;

    document.getElementById("shipping").textContent =
      `$${shipping.toFixed(2)}`;

    document.getElementById("tax").textContent =
      `$${tax.toFixed(2)}`;

    document.getElementById("orderTotal").textContent =
      `$${total.toFixed(2)}`;
  }

  /**
   * Package cart items
   */
  packageItems() {
    return this.cartItems.map((item) => ({
      id: item.Id,
      quantity: item.quantity || 1,
    }));
  }

  /**
   * Submit checkout
   */
  async checkout(form) {
    const button = document.getElementById("checkoutButton");
    const messages = document.getElementById("formMessages");

    // Clear previous messages
    messages.innerHTML = "";

    button.disabled = true;
    button.textContent = "Processing...";

    try {
      const subtotal = this.calculateSubtotal();
      const shipping = this.calculateShipping();
      const tax = Number(this.calculateTax(subtotal).toFixed(2));
      const total = Number((subtotal + shipping + tax).toFixed(2));

      const order = formDataToJSON(form);

      order.orderDate = new Date().toISOString();
      order.items = this.packageItems();
      order.shipping = shipping;
      order.tax = tax;
      order.orderTotal = total;

      const result = await this.services.checkout(order);

      messages.innerHTML = `
        <div class="message success">
          <strong>🎉 Order submitted successfully!</strong><br>
          Order ID: ${result.orderId}<br>
          Redirecting to the home page...
        </div>
      `;

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Empty cart
      setLocalStorage(this.cartKey, []);

      // Update badge
      updateCartCount();

      // Reset form
      form.reset();

      // Wait before redirecting
      setTimeout(() => {
        window.location.href = "/";
      }, 6000);

    } catch (err) {

      let message = "Unable to submit order.";

      try {
        const apiErrors = JSON.parse(err.message);

        message = Object.values(apiErrors).join("<br>");

      } catch {

        message =
          "Network error. Please check your connection.";

      }

      messages.innerHTML = `
        <div class="message error">
          <strong>Checkout Failed</strong><br>
          ${message}
        </div>
      `;

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    } finally {

      button.disabled = false;
      button.textContent = "Place Order";

    }
  }
}