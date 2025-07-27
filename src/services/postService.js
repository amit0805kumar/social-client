import { callApi } from "../helpers/Helpers";

export const createPostService = async (postData, token) => {
  try {
    await callApi("POST", "posts", token, postData);
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Error creating post: " + error.message);
  }
};

export const fetchUserPosts = async (userId, token) => {
  try {
    const response = await callApi("GET", `posts/user/${userId}`, token);
    return response.data;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw new Error("Error fetching user posts: " + error.message);
  }
};

export const fetchTimelinePosts = async (userId, token) => {
  try {
    const response = await callApi("GET", `posts/all/${userId}`, token);
    return response.data;
  } catch (error) {
    console.error("Error fetching timeline posts:", error);
    throw new Error("Error fetching timeline posts: " + error.message);
  }
};

export const updatePostService = async (loggedUserId, postData, token) => {
  try {
    const response = await callApi(
      "PATCH",
      `posts/${loggedUserId}`,
      token,
      postData
    );
    console.log("Post updated successfully:", response);
    if (response && response.success) {
      return response.data;
    } else {
      throw new Error("Failed to update post");
    }
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error("Error updating post: " + error.message);
  }
};

export const deletePostService = async (postId, token) => {
  try {
    await callApi("DELETE", `posts/${postId}`, token);
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Error deleting post: " + error.message);
  }
};

export const deleteProfilePostService = async (userId, postId, token) => {
  try {
    const response = await callApi("DELETE", `posts/${userId}`, token, {
      postId
    });
    if (response && response.success) {
      return response.data;
    } else {
      throw new Error("Failed to delete profile post");
    }
  } catch (error) {
    console.error("Error deleting profile post:", error);
    throw new Error("Error deleting profile post: " + error.message);
  }
};

export const likePostService = async (postId) => {
  try {
    const response = await callApi("PATCH", `posts/like/${postId}`);
    return response;
  } catch (error) {
    console.error("Error liking post:", error);
    throw new Error("Error liking post: " + error.message);
  }
};

export const unlikePostService = async (postId) => {
  try {
    const response = await callApi("PATCH", `posts/unlike/${postId}`);
    return response;
  } catch (error) {
    console.error("Error unliking post:", error);
    throw new Error("Error unliking post: " + error.message);
  }
}


export const fetchAllPosts = async (page=1, limit=10) => {
  try {
    const response = await callApi("GET", `posts/?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all posts:", error);
    throw new Error("Error fetching all posts: " + error.message);
  }
}

export const createMultiplePosts = async (data)=>{
  try{
    const response = await callApi("POST", "posts/multiple", null, data);
    return response;
  }catch(error){
    console.error("Error creating multiple posts:", error);
    throw new Error("Error creating multiple posts: " + error.message);
  }
}