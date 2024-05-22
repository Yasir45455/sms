import axios from "axios";
export default axios.create({
    // baseURL:'http://192.168.100.57:8000/api'
    // baseURL:'http://192.168.100.2:8000/api'
    // baseURL:'http://192.168.100.10:8080/api'
    baseURL:'http://localhost:4000/api'
})