import { callApi } from "../helpers/Helpers";

export const fetchGifs = async (limit = 10) => {
  try {
    const response = await callApi("GET", `gif/all?limit=${limit}`);
    if (response && response.success) {
      return response.data;
    } else {
      throw new Error("Failed to fetch gifs");
    }
  } catch (error) {
    console.error("Error fetching gifs:", error);
    throw new Error("Error fetching gifs: " + error.message);
  }
}

export const createGifs = async (gifData) => {
  try {
    const response = await callApi("POST", "gif", gifData);
    if (response && response.success) {
      return response.data;
    } else {
      throw new Error("Failed to create gif");
    }
  } catch (error) {
    console.error("Error creating gif:", error);
    throw new Error("Error creating gif: " + error.message);
  }
}