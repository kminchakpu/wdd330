import {
  getLocalStorage,
  setLocalStorage,
  formDataToJSON,
} from "./utils.mjs";

import updateCartCount from "./cartCount.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
  constructor(cartKey) {
    this.cartKey = cartKey;
    this.cartItems = [];
    this.services = new ExternalServices();
  }

  /**
   * Initialize the checkout page
   */
  init() {
    this.cartItems = getLocalStorage(this.cartKey) || [];

    this.calculateOrderTotals();


    //Validate the form before it is submitted
    const form = document.getElementById("checkoutForm");

    if (form) {
      document.querySelector("#checkoutSubmit").addEventListener('click', (e) => {
        e.preventDefault();
        const validForm = form.checkValidity();
        
        if (validForm) {
          checkout(validForm);
        }
        form.reportValidity();

        //Clear the local storage if the form is successull submitted 
        if (e.ok) {
          localStorage.clear();
        }
      });
    }
  }



  /**
   * Calculate subtotal
   */
  calculateSubtotal() {
    return this.cartItems.reduce((sum, item) => {
      return sum + Number(item.FinalPrice) * (item.quantity || 1);
    }, 0);
  }

  /**
   * Calculate shipping
   */
  calculateShipping() {
    if (this.cartItems.length === 0) return 0;

    return 10 + (this.cartItems.length - 1) * 2;
  }

  /**
   * Calculate tax (6%)
   */
  calculateTax(subtotal) {
    return subtotal * 0.06;
  }

  /**
   * Display totals on the page
   */
  calculateOrderTotals() {
    const subtotal = this.calculateSubtotal();
    const shipping = this.calculateShipping();

    // Round tax to 2 decimal places
    const tax = Number(this.calculateTax(subtotal).toFixed(2));

    // Round total to 2 decimal places
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
   * Package items for the checkout API
   */
  packageItems() {
    return this.cartItems.map((item) => ({
      id: item.Id,
      quantity: item.quantity || 1,
    }));
  }

  /**
   * Submit the order
   */
  async checkout(formElement) {
    try {
      // Convert form into an object
      const order = formDataToJSON(formElement);

      // Calculate totals
      const subtotal = this.calculateSubtotal();
      const shipping = this.calculateShipping();

      // Round values before sending to the API
      const tax = Number(this.calculateTax(subtotal).toFixed(2));
      const orderTotal = Number(
        (subtotal + shipping + tax).toFixed(2)
      );

      // Build the order object
      order.orderDate = new Date().toISOString();
      order.items = this.packageItems();
      order.shipping = shipping;
      order.tax = tax;
      order.orderTotal = orderTotal;

      // Debug output
      console.log("========== ORDER ==========");
      console.log(order);
      console.log(JSON.stringify(order, null, 2));

      // Submit to API
      const result = await this.services.checkout(order);

      console.log("Checkout Success:");
      console.log(result);

      alert("🎉 Order submitted successfully!");

      // Empty cart
      setLocalStorage(this.cartKey, []);

      // Update cart badge
      updateCartCount();

      // Redirect home
      window.location.href = "/";
    } catch (err) {
      console.error("Checkout Error:");
      console.error(err);

      alert("Unable to complete checkout. Please try again.");
    }
  }
}



