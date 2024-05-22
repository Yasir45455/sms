import axios from "../Axios"

export const fetchData = (url) =>{
    const token = localStorage.getItem('quic-token')
    return axios.get(
        url,
        {
            headers:{
                'Authorization': "Bearer "+token
            }
        }
        )
}