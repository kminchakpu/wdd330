// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localStorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);

  // Return an empty array if nothing is stored
  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

// save data to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });

  qs(selector).addEventListener("click", callback);
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);

  return product;
}

// Render a list using a template function
export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(template);

  // If clear is true, clear out the parent element first
  if (clear) {
    parentElement.innerHTML = "";
  }

  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(
  template, 
  parentElement, 
  data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
    const response = await fetch(path);
    const template = await response.text();
    return template;
}

export async function loadHeaderFooter() {
    // Load header
    const headerTemplate = await loadTemplate("../partials/header.html");
    const headerElement = document.querySelector("#main-header");

    renderWithTemplate(headerTemplate, headerElement);

    // Load footer
    const footerTemplate = await loadTemplate("../partials/footer.html");
    const footerElement = document.querySelector("#main-footer");

    renderWithTemplate(footerTemplate, footerElement);
}