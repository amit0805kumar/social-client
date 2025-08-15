    import { callApi } from "../helpers/Helpers";

export const loginUser = async (username, password) => {
  try {
    const loggedUser = await callApi("POST", "auth/login", {
      username: username,
      password: password,
    });
    if(loggedUser.success === false) {
      throw new Error(loggedUser.message || "Login failed");
    }
    return loggedUser.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await callApi("POST", "auth/logout");
    if (response.success) {
      return response;
    } else {
      throw new Error("Logout failed");
    }
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}


export const registerUser = async (userData) => {
  try {
    const response = await callApi("POST", "users", userData);
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}