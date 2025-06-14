import { callApi } from "../helpers/Helpers";

export const fetchAllUsers = async (token) => {
  try {
    const users = await callApi("GET", "users/", token);
    return users.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
}

export const fetchUserById = async (userId, token) => {
  try {
    const user = await callApi("GET", `users/${userId}`, token);
    return user.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}

export const updateUserService = async (userId, userData, token) => {
  try {
    const updatedUser = await callApi("PATCH", `users/${userId}`, token, userData);
    return updatedUser.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
