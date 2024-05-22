import axios from "../Axios"

export const postData = (url,data) =>{
    return axios.post(
        url,
        data
        )
}