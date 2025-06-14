import { callApi } from "../helpers/Helpers";

export const createPostService = async (postData, token) => {
    try {
         await callApi("POST", "posts",token, postData);
    } catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Error creating post: " + error.message);
    }
}

export const fetchUserPosts = async (userId, token) => {
    try {
        const response = await callApi("GET", `posts/user/${userId}`, token);
        return response.data;
    } catch (error) {
        console.error("Error fetching user posts:", error);
        throw new Error("Error fetching user posts: " + error.message);
    }
}

export const fetchTimelinePosts = async (userId, token) => {
    try {
        const response = await callApi("GET", `posts/all/${userId}`, token);
        return response.data;
    } catch (error) {
        console.error("Error fetching timeline posts:", error);
        throw new Error("Error fetching timeline posts: " + error.message);
    }
}