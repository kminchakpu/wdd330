function convertToJson(response) {
  return response.json().then((data) => {
    if (response.ok) {
      return data;
    }

    console.error("API Error:", data);

    // Throw the API response so CheckoutProcess can display it
    throw new Error(JSON.stringify(data));
  });
}

const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ExternalServices {
  /**
   * Get products by category
   */
  async getData(category) {
    const response = await fetch(
      `${baseURL}products/search/${category}`
    );

    const data = await convertToJson(response);

    return data.Result;
  }

  /**
   * Get one product
   */
  async findProductById(id) {
    const response = await fetch(
      `${baseURL}product/${id}`
    );

    const data = await convertToJson(response);

    return data.Result;
  }

  /**
   * Search products
   */
  async findProducts(query) {
    const response = await fetch(
      `${baseURL}products/search/${query}`
    );

    const data = await convertToJson(response);

    return data.Result;
  }

  /**
   * Submit checkout order
   */
  async checkout(order) {
    const response = await fetch(
      `${baseURL}checkout/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }
    );

    return convertToJson(response);
  }
}