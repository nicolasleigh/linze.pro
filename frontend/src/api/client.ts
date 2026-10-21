import axios from "axios"

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD ? "/api/v1" : "http://localhost:8085/api/v1")

export const client = axios.create({
  baseURL,
  withCredentials: true,
})
