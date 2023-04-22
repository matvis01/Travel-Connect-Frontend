import axios from "axios"

const api = axios.create({
  baseURL: "https://touristapi.azurewebsites.net",
})
export const addAuthToken = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
}

export default api
