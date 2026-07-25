import { formDataToJSON } from "./utils.mjs";

import ExternalServices from "./ExternalServices.mjs";

import {
  validateRequired,
  validateEmail,
  validatePhone,
  validateZip,
  validatePassword,
  validatePasswordMatch,
} from "./validation.js";

export default class RegistrationProcess {
  constructor() {
    this.form = document.getElementById("registerForm");
    this.services = new ExternalServices();
  }

  init() {
    if (!this.form) return;

    this.enableLiveValidation();

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!this.validateForm()) return;

      this.register();
    });
  }

  enableLiveValidation() {
    document
      .getElementById("fname")
      .addEventListener("blur", (e) =>
        validateRequired(e.target)
      );

    document
      .getElementById("lname")
      .addEventListener("blur", (e) =>
        validateRequired(e.target)
      );

    document
      .getElementById("street")
      .addEventListener("blur", (e) =>
        validateRequired(e.target)
      );

    document
      .getElementById("city")
      .addEventListener("blur", (e) =>
        validateRequired(e.target)
      );

    document
      .getElementById("state")
      .addEventListener("blur", (e) =>
        validateRequired(e.target)
      );

    document
      .getElementById("email")
      .addEventListener("blur", (e) =>
        validateEmail(e.target)
      );

    document
      .getElementById("phone")
      .addEventListener("blur", (e) =>
        validatePhone(e.target)
      );

    document
      .getElementById("zip")
      .addEventListener("blur", (e) =>
        validateZip(e.target)
      );

    document
      .getElementById("password")
      .addEventListener("blur", (e) =>
        validatePassword(e.target)
      );

    document
      .getElementById("confirmPassword")
      .addEventListener("blur", () =>
        validatePasswordMatch(
          document.getElementById("password"),
          document.getElementById("confirmPassword")
        )
      );
  }

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
      validatePassword(document.getElementById("password")) &&
      validatePasswordMatch(
        document.getElementById("password"),
        document.getElementById("confirmPassword")
      )
    );
  }

  async register() {
    const button = document.getElementById("registerButton");
    const messages = document.getElementById("registerMessages");

    button.disabled = true;
    button.textContent = "Creating Account...";

    // Clear any previous messages
    messages.innerHTML = "";

    try {
      const user = formDataToJSON(this.form);

      // Don't send confirmPassword to the API
      delete user.confirmPassword;

      console.log("========== USER ==========");
      console.log(user);

      const result = await this.services.createUser(user);

      console.log("========== REGISTRATION SUCCESS ==========");
      console.log(result);

      // Display success message
      messages.innerHTML = `
        <div class="message success">
          <strong>✔ Registration Successful!</strong><br>
          Welcome to Sleep Outside.<br><br>
          Your account has been created successfully.<br>
          Redirecting to the homepage...
        </div>
      `;

      console.log("Success message displayed.");

      // Scroll to the top of the form
      messages.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Reset the form
      this.form.reset();

      // Wait 3 seconds so the user can read the message
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);

    } catch (err) {
      console.error("========== REGISTRATION ERROR ==========");
      console.error(err);

      let message = "Unable to create your account.";

      try {
        const apiErrors = JSON.parse(err.message);
        message = Object.values(apiErrors).join("<br>");
      } catch {
        message =
          "Network error. Please check your internet connection.";
      }

      messages.innerHTML = `
        <div class="message error">
          <strong>Registration Failed</strong><br><br>
          ${message}
        </div>
      `;

      messages.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    } finally {
      button.disabled = false;
      button.textContent = "Create Account";
    }
  }
}