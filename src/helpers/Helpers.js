import React from "react";
import axios from "axios";
import constants  from "../constants";

export const callApi = async (method, url, body) => {
  try {
    switch (method) {
      case "GET":
        return await axios.get(`${constants.API_BASE_URL}${url}`);
        break;
      case "POST":
        return await axios.post(`${constants.API_BASE_URL}${url}`, body);
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  } catch (error) {
    console.log(error);
  }
};

