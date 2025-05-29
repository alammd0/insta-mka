import axios from "axios";

export const instance = axios.create({
  baseURL: "/api",
});

export const apiconnecter = async (
  method: string,
  url: string,
  data?: string,
  headers?: () => object
) => {

  try {
    const response = await instance({
      method: method,
      url: url,
      data: data,
      headers: headers ? headers() : undefined,
    });

    console.log("API Response:", response.data);

    return response.data;

  } catch (err) {

    console.log("API Error:", err);
    if (axios.isAxiosError(err)) {
      // Handle Axios error
      console.error("Axios error:", err.message);
      throw new Error(err.message);
    } else {
      // Handle other types of errors
      console.error("Unexpected error:", err);
      throw new Error("An unexpected error occurred");
    }
  }
};
