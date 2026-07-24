/**
 * Displays an error message for an input.
 */
export function showError(input, message) {
  let error = input.nextElementSibling;

  if (!error || !error.classList.contains("error-message")) {
    error = document.createElement("small");
    error.className = "error-message";
    input.after(error);
  }

  error.textContent = message;

  input.classList.remove("valid");
  input.classList.add("invalid");
}

/**
 * Removes the error message.
 */
export function clearError(input) {
  const error = input.nextElementSibling;

  if (error && error.classList.contains("error-message")) {
    error.textContent = "";
  }

  input.classList.remove("invalid");
  input.classList.add("valid");
}

/**
 * Required field validation.
 */
export function validateRequired(input) {
  if (input.value.trim() === "") {
    showError(input, "This field is required.");
    return false;
  }

  clearError(input);
  return true;
}

/**
 * Email validation.
 */
export function validateEmail(input) {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(input.value.trim())) {
    showError(input, "Please enter a valid email address.");
    return false;
  }

  clearError(input);
  return true;
}

/**
 * Phone validation.
 */
export function validatePhone(input) {
  const phoneRegex =
    /^[0-9+\-\s()]{7,20}$/;

  if (!phoneRegex.test(input.value.trim())) {
    showError(input, "Please enter a valid phone number.");
    return false;
  }

  clearError(input);
  return true;
}

/**
 * Credit card validation.
 */
export function validateCard(input) {
  const cardRegex =
    /^[0-9]{16}$/;

  if (!cardRegex.test(input.value.trim())) {
    showError(
      input,
      "Card number must contain exactly 16 digits."
    );

    return false;
  }

  clearError(input);
  return true;
}

/**
 * Expiration validation.
 */
export function validateExpiration(input) {
  const expRegex =
    /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

  if (!expRegex.test(input.value.trim())) {
    showError(
      input,
      "Use MM/YY format."
    );

    return false;
  }

  const [month, year] =
    input.value.split("/");

  const expiry = new Date(
    2000 + Number(year),
    Number(month)
  );

  if (expiry < new Date()) {
    showError(
      input,
      "Card has expired."
    );

    return false;
  }

  clearError(input);

  return true;
}

/**
 * Security code validation.
 */
export function validateCVV(input) {
  const cvvRegex =
    /^[0-9]{3,4}$/;

  if (!cvvRegex.test(input.value.trim())) {
    showError(
      input,
      "Security code must contain 3 or 4 digits."
    );

    return false;
  }

  clearError(input);

  return true;
}

/**
 * ZIP validation.
 */
export function validateZip(input) {
  if (input.value.trim().length < 4) {
    showError(
      input,
      "Zip code is too short."
    );

    return false;
  }

  clearError(input);

  return true;
}