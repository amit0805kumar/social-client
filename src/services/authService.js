    import { callApi } from "../helpers/Helpers";

export const loginUser = async (username, password) => {
  try {
    const loggedUser = await callApi("POST", "auth/login", null, {
      username: username,
      password: password,
    });
    return loggedUser.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};


export const registerUser = async (userData) => {
  try {
    const response = await callApi("POST", "users", null, userData);
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}