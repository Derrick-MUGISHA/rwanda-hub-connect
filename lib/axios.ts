import axios from "axios";

export const api = axios.create({
  baseURL: "https://your-api.com", // our API with your actual API URL
  headers: {
    "Content-Type": "application/json",
  },
});
