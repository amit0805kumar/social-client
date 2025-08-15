import { callApi } from "../helpers/Helpers";

export const fetchAllUsers = async () => {
  try {
    const users = await callApi("GET", "users/");
    return users.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const fetchUserByIdService = async (userId) => {
  try {
    const user = await callApi("GET", `users/${userId}`);
    return user.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

export const updateUserService = async (userId, userData) => {
  try {
    const updatedUser = await callApi("PATCH", `users/${userId}`, userData);
    return updatedUser.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const fetchFollowingUsersService = async (userIds) => {
  try {
    const promises = [];
    userIds.forEach((userId) => {
      promises.push(fetchUserByIdService(userId));
    });
    const friends = await Promise.all(promises);
    return friends;
  } catch (error) {
    console.error("Error fetching friends:", error);
    throw error;
  }
};

export const followUserService = async (userId, followUserId) => {
  try {
    const response = await callApi("PATCH", `users//follow/${userId}`, {
      followUserId: followUserId,
    });
    return response.data;
  } catch (error) {
    console.error("Error following user:", error);
    throw error;
  }
};

export const unfollowUserService = async (userId, followUserId) => {
  try {
    const response = await callApi("PATCH", `users//unfollow/${userId}`, {
      followUserId: followUserId,
    });
    return response.data;
  } catch (error) {
    console.error("Error unfollowing user:", error);
    throw error;
  }
};

export const changePasswordService = async (
  userId,
  oldPassword,
  newPassword
) => {
  try {
    const response = await callApi("PATCH", `users/change-password/${userId}`, {
      oldPassword,
      newPassword,
    });
    return response;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};
