import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export async function fetchStories() {
  const res = await axios.get(`${BASE_URL}/stories`);
  return res.data;
}

export async function fetchStoryById(id) {
  const res = await axios.get(`${BASE_URL}/stories/${id}`);
  return res.data;
}

export async function submitStory(story) {
  const res = await axios.post(`${BASE_URL}/stories`, story);
  return res.data;
}
