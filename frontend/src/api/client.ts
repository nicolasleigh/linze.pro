import axios from "axios";

let baseURL = "http://localhost:8080";

if (import.meta.env.PROD) {
  // TODO:
  baseURL = "";
}

export const client = axios.create({
  baseURL,
  withCredentials: true,
});
