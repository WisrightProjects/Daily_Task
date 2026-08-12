import api from "../api/axios";

const postService = {
  // Get all posts
  getAll: () => {
    return api.get("/posts");
  },

  // Get post by ID
  getById: (id) => {
    return api.get(`/posts/${id}`);
  },

  // Create post
  create: (postData) => {
    return api.post("/posts", postData);
  },

  // Update post
  update: (id, postData) => {
    return api.put(`/posts/${id}`, postData);
  },

  // Delete post
  delete: (id) => {
    return api.delete(`/posts/${id}`);
  },
};

export default postService;