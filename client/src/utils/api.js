import axios from "axios";

// Base URL from .env or fallback
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Helper to get token from localStorage
const getToken = () => localStorage.getItem("token");

// Fetch all stories (public)
export const fetchStories = async () => {
  const res = await axios.get(`${BASE_URL}/stories`);
  return res.data;
};

// Fetch single story by ID (public)
export const fetchStoryById = async (id) => {
  const res = await axios.get(`${BASE_URL}/stories/${id}`);
  return res.data;
};

// Submit a story (protected)
export const submitStory = async (storyData) => {
  const res = await axios.post(`${BASE_URL}/stories`, storyData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Register a new user
export const registerUser = async (userData) => {
  const res = await axios.post(`${BASE_URL}/auth/register`, userData);
  return res.data;
};

// Login a user
export const loginUser = async (userData) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, userData);
  return res.data;
};
