import axios from "axios"
 
const api = axios.create({
    baseURL:"https://moodify-bumx.onrender.com",
    withCredentials:true
})

export async function get_songs(mood){
    const res = await api.get(`/api/get_songs?mood=${mood}`)
    return res.data
}
