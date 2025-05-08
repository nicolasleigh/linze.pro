import axios from "axios"

let baseURL = "http://localhost:8085/api/v1"

if (import.meta.env.PROD) {
  baseURL = "https://linze.pro/api/v1"
}

export const client = axios.create({
  baseURL,
  withCredentials: true,
})
