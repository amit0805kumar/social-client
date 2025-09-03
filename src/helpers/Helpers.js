import axios from "axios";
import constants from "../utils/constants";

// ✅ Configure Axios defaults for all requests
axios.defaults.baseURL = constants.API_BASE_URL;
axios.defaults.withCredentials = true; // ✅ include cookies in all requests

export const callApi = async (method, url, body = null) => {
  try {
    let response;

    switch (method) {
      case "GET":
        response = await axios.get(url);
        break;

      case "POST":
        response = await axios.post(url, body);
        break;

      case "PUT":
        response = await axios.put(url, body);
        break;

      case "PATCH":
        response = await axios.patch(url, body);
        break;

      case "DELETE":
        response = await axios.delete(url, { data: body });
        break;

      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    return response.data; // ✅ return API response data only

  } catch (error) {
    console.error("API Error:", error.response || error.message);
    return error?.response?.data || { success: false, message: "Unknown error" };
  }
};

export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
  return shuffled.map(item => {
    if (item.img && item.img.startsWith("https://idoxe3r.sufydely.com/") && !item.img.includes("/1/")) {
      item.img = item.img.replace("https://idoxe3r.sufydely.com/", "https://idoxe3r.sufydely.com/1/");
    }
    return item;
  });
}
