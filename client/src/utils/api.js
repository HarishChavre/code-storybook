import axios from "axios";


const BASE_URL = process.env.REACT_APP_API_URL || "localhost:5000";


const getToken = () => localStorage.getItem("token");


export const fetchStories = async () => {
  const res = await axios.get(`${BASE_URL}/stories`);
  return res.data;
};


export const fetchStoryById = async (id) => {
  const res = await axios.get(`${BASE_URL}/stories/${id}`);
  return res.data;
};


export const submitStory = async (storyData) => {
  const res = await axios.post(`${BASE_URL}/stories`, storyData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};


export const registerUser = async (userData) => {
  const res = await axios.post(`${BASE_URL}/auth/register`, userData);
  return res.data;
};


export const loginUser = async (userData) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, userData);
  return res.data;
};
