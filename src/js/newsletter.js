// ======================================
// Newsletter Signup
// ======================================

export default function initNewsletter() {
  const form = document.getElementById("newsletterForm");

  if (!form) return;

  const emailInput = document.getElementById("newsletterEmail");
  const button = document.getElementById("newsletterButton");
  const message = document.getElementById("newsletterMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    message.innerHTML = "";

    const email = emailInput.value.trim().toLowerCase();

    // -----------------------------
    // Validate Email
    // -----------------------------

    if (!validateEmail(email)) {
      showError("Please enter a valid email address.");
      return;
    }

    // -----------------------------
    // Get Subscribers
    // -----------------------------

    const subscribers =
      JSON.parse(localStorage.getItem("newsletter")) || [];

    // -----------------------------
    // Check Duplicate
    // -----------------------------

    if (subscribers.includes(email)) {
      showError(
        "You're already subscribed to our newsletter."
      );
      return;
    }

    // -----------------------------
    // Save Email
    // -----------------------------

    button.disabled = true;
    button.textContent = "Subscribing...";

    subscribers.push(email);

    localStorage.setItem(
      "newsletter",
      JSON.stringify(subscribers)
    );

    // -----------------------------
    // Success
    // -----------------------------

    showSuccess(
      "🎉 Thank you for subscribing to the Sleep Outside Newsletter!"
    );

    form.reset();

    button.disabled = false;
    button.textContent = "Subscribe";
  });

  // =====================================
  // Helper Functions
  // =====================================

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showSuccess(text) {
    message.innerHTML = `
      <div class="newsletter-success">
        ${text}
      </div>
    `;
  }

  function showError(text) {
    message.innerHTML = `
      <div class="newsletter-error">
        ${text}
      </div>
    `;
  }
}