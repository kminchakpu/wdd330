export function renderCategoryBreadcrumb(category, count) {
  const breadcrumb = document.getElementById("breadcrumb");

  if (!breadcrumb) return;

  const formattedCategory = category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  breadcrumb.innerHTML = `
    <a href="/product_listing/index.html?category=${category}">
      ${formattedCategory}
    </a>
    <span> → (${count} items)</span>
  `;
}

export function renderProductBreadcrumb(category) {
  const breadcrumb = document.getElementById("breadcrumb");

  if (!breadcrumb) return;

  const formattedCategory = category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  breadcrumb.innerHTML = `
    <a href="/product_listing/index.html?category=${category}">
      ${formattedCategory}
    </a>
  `;
}
