function convertToJson(response) {
  return response.json().then((data) => {
    if (response.ok) {
      return data;
    }

    console.error("API Error:", data);

    // Throw the API response so other classes can display the errors
    throw new Error(JSON.stringify(data));
  });
}

const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ExternalServices {
  /**
   * Get all products in a category.
   * Examples:
   * tents
   * backpacks
   * hammocks
   * sleeping-bags
   */
  async getData(category) {
    const response = await fetch(
      `${baseURL}products/search/${category}`
    );

    const data = await convertToJson(response);

    return data.Result;
  }

  /**
   * Get a single product by ID.
   */
  async findProductById(id) {
    const response = await fetch(
      `${baseURL}product/${id}`
    );

    const data = await convertToJson(response);

    return data.Result;
  }

  /**
   * Search products.
   */
  async findProducts(query) {
    const response = await fetch(
      `${baseURL}products/search/${query}`
    );

    const data = await convertToJson(response);

    return data.Result;
  }

  /**
   * Submit an order to the checkout API.
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

  /**
   * Register a new customer.
   */
  async createUser(user) {
    const response = await fetch(
      `${baseURL}users/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    return convertToJson(response);
  }
}