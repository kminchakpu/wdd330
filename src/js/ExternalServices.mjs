function convertToJson(response) {
  return response.json().then((data) => {
    if (response.ok) {
      return data;
    }

    console.error("API Error:", data);

    throw new Error(JSON.stringify(data));
  });
}

const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ExternalServices {
  async getData(category) {
    const response = await fetch(
      `${baseURL}products/search/${category}`
    );

    const data = await convertToJson(response);

    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(
      `${baseURL}product/${id}`
    );

    const data = await convertToJson(response);

    return data.Result;
  }

  async checkout(order) {
    const response = await fetch(
      `${baseURL}checkout/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
      }
    );

    return convertToJson(response);
  }
}