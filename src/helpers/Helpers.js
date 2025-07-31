import axios from "axios";
import constants from "../utils/constants";

export const callApi = async (method, url, token, body) => {
  const tk = await JSON.parse(localStorage.getItem("token"));
  try {
    let response;

    switch (method) {
      case "GET":
        response = await axios.get(`${constants.API_BASE_URL}${url}`, {
          headers: {
            Authorization: `Bearer ${tk}`,
          },
        });
        break;
      case "POST":
        response = await axios.post(`${constants.API_BASE_URL}${url}`, body, {
          headers: {
            Authorization: `Bearer ${tk}`,
          },
        });
        break;
      case "PUT":
        response = await axios.put(`${constants.API_BASE_URL}${url}`, body, {
          headers: {
            Authorization: `Bearer ${tk}`,
          },
        });
        break;
      case "PATCH":
        response = await axios.patch(`${constants.API_BASE_URL}${url}`, body, {
          headers: {
            Authorization: `Bearer ${tk}`,
          },
        });
        break;
      case "DELETE":
        response = await axios.delete(`${constants.API_BASE_URL}${url}`, {
          data: body,
          headers: {
            Authorization: `Bearer ${tk}`,
          },
        });
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    return response.data; // ✅ only return the data

  } catch (error) {
    console.log(error);
    // Optionally return error.response.data for better feedback
    return error?.response?.data || { success: false, message: 'Unknown error' };
  }
};


export function shuffleArray(array) {
  const shuffled = [...array]; // clone the array to avoid mutating original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
