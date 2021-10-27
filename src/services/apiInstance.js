import axios from "axios"

const url = process.env.VUE_APP_API_URL

const api = axios.create({
    baseURL: url
})

api.interceptors.response.use(
    (response) => response.data.data,
    (error) => Promise.reject(error)
)

export default api;