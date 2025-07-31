import { callApi } from "../helpers/Helpers";

export const fetchAllUsers = async (token) => {
  try {
    const users = await callApi("GET", "users/", token);
    return users.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const fetchUserByIdService = async (userId, token) => {
  try {
    const user = await callApi("GET", `users/${userId}`, token);
    return user.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

export const updateUserService = async (userId, userData, token) => {
  try {
    const updatedUser = await callApi(
      "PATCH",
      `users/${userId}`,
      token,
      userData
    );
    return updatedUser.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const fetchFollowingUsersService = async (userIds, token) => {
  try {
    const promises = [];
    userIds.forEach((userId) => {
      promises.push(fetchUserByIdService(userId, token));
    });
    const friends = await Promise.all(promises);
    return friends;
  } catch (error) {
    console.error("Error fetching friends:", error);
    throw error;
  }
};

export const followUserService = async (userId, followUserId, token) => {
  try {
    const response = await callApi(
      "PATCH",
      `users//follow/${userId}`,
      token,
      { followUserId: followUserId }
    );
    return response.data;
  } catch (error) {
    console.error("Error following user:", error);
    throw error;
  }
}

export const unfollowUserService = async (userId, followUserId, token) => {
  try {
    const response = await callApi(
      "PATCH",
      `users//unfollow/${userId}`,
      token,
      { followUserId: followUserId }
    );
    return response.data;
  } catch (error) {
    console.error("Error unfollowing user:", error);
    throw error;
  }
}

export const changePasswordService = async (userId,oldPassword, newPassword, token) => {
  try {
    const response = await callApi(
      "PATCH",
      `users/change-password/${userId}`,
      token,
      { oldPassword, newPassword }
    );
    return response;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
}