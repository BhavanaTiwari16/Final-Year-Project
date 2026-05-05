import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
});

export const getAllBlogs      = ()         => API.get("/blogs");
export const getBlogById      = (id)       => API.get(`/blogs/${id}`);
export const getBlogsByAuthor = (authorId) => API.get(`/blogs/author/${authorId}`);
export const getBlogsByTopic  = (topicId)  => API.get(`/blogs/topic/${topicId}`);
export const getAllTopics      = ()         => API.get("/topics");

export const createBlog = (data, config) => API.post("/blogs", data, config);
export const editBlog   = (id, data, config) => API.patch(`/blogs/${id}`, data, config);
export const submitBlog = (id, config)   => API.patch(`/blogs/${id}/submit`, {}, config);
export const deleteBlog = (id, config)   => API.delete(`/blogs/${id}`, config);
