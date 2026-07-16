export default function initSearch() {
  const form = document.getElementById("searchForm");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = document
      .getElementById("searchInput")
      .value
      .trim();

    if (!value) return;

    window.location =
      `/product_listing/index.html?search=${encodeURIComponent(value)}`;
  });
}