import axios from "axios";

// Create an instance of axios with the base URL and headers
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-type": "application/json" },
});
export default instance;
