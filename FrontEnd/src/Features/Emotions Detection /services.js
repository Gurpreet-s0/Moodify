import axios from "axios"
 
const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export async function get_songs(mood){
    const res = await api.get(`/api/get_songs?mood=${mood}`)
    return res.data
}
