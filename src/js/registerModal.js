import { loadTemplate, renderWithTemplate } from "./utils.mjs";

export default async function initRegisterModal() {

  // already visited?
  if (localStorage.getItem("registered")) {
    return;
  }

  const template = await loadTemplate(
    "../partials/registerModal.html"
  );

  const placeholder =
    document.getElementById("modalPlaceholder");

  renderWithTemplate(template, placeholder);

  const modal =
    document.getElementById("registerModal");

  modal.classList.remove("hidden");

  document
    .getElementById("closeRegisterModal")
    .addEventListener("click", closeModal);

  document
    .getElementById("registerForm")
    .addEventListener("submit", registerUser);

  function closeModal() {
    modal.classList.add("hidden");

    localStorage.setItem(
      "registered",
      "dismissed"
    );
  }

  function registerUser(e) {

    e.preventDefault();

    const name =
      document.getElementById("registerName").value;

    const email =
      document.getElementById("registerEmail").value;

    localStorage.setItem(
      "registered",
      JSON.stringify({
        name,
        email
      })
    );

    alert(
      "🎉 Thanks for registering! You have been entered into the giveaway."
    );

    modal.classList.add("hidden");
  }
}