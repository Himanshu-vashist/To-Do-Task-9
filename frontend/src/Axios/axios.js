import axios from "axios"
const instance = axios.create({
    baseURL:"https://to-do-task-backend-1rb2.onrender.com"
})
export default instance
