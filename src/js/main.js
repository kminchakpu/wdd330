import ProductData from "./ProductData.mjs";

// 1. Initialize our data source for the 'tents' category
const dataSource = new ProductData("tents");

// 2. Find our list container in the HTML where the tents will live
const listElement = document.querySelector(".product-list");

// 3. This function takes a single product object and clones our template structure
function renderProductCard(product) {
    const template = document.getElementById("product-card-template");
    const clone = template.content.cloneNode(true);

    // Fill in the dynamic values for this product card
    clone.querySelector("a").href = `product_pages/?product=${product.Id}`;
    // 1. Get the image path from the product data
    // 1. Get the image path from the product data
    let imagePath = product.Image;

    // 2. Direct fix: Force both broken tent items to use valid images that exist in your folder
    if (product.NameWithoutBrand === "Ajax Tent - 2-Person, 3-Season" || product.Id === "880RR-2") {
        imagePath = "images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg";
    } else if (product.NameWithoutBrand === "Talus Tent - 3-Person, 3-Season" || product.Id === "985RF") {
        // Falls back to using the working 4-Person Talus image path
        imagePath = "images/tents/the-north-face-talus-tent-4-person-3-season-in-golden-oak-saffron-yellow~p~985rf_01~320.jpg";
    }

    // 3. Set the image src with a leading slash so Vite finds it perfectly
    clone.querySelector("img").src = `/${imagePath}`;
    clone.querySelector("img").alt = product.Name;
    clone.querySelector(".card__brand").textContent = product.Brand.Name;
    clone.querySelector(".card__name").textContent = product.NameWithoutBrand;
    clone.querySelector(".product-card__price").textContent = `$${product.FinalPrice}`;

    return clone;
}

// 4. Create an asynchronous function to fetch the data and append the elements
async function init() {
    // Wait for the data to fetch from the local json folder
    const products = await dataSource.getData();

    // Loop through each product item we received
    products.forEach(product => {
        const productCard = renderProductCard(product);
        listElement.appendChild(productCard);
    });
}

// Fire off the initialization function!
init();