import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
<<<<<<< HEAD
=======
        productListing: resolve(__dirname, "src/product_listing/index.html"),
>>>>>>> b981eb30dd3830253c0ea1dfdfee97d77a645f6f
      },
    },
  },
});
