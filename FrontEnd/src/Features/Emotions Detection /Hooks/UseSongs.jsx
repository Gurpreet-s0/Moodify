import { useContext } from "react";
import { SongContext } from "../Context/song.context";
import React from 'react'
import { get_songs } from "../services";

const UseSongs = () => {

const {song,setsong,songloading,setsongloading} = useContext(SongContext)


const get_songs_handler = (mood)=>{
    setsongloading(true)
    get_songs(mood)
    .then((res)=>{
        setsong(res.song)
    })
    .catch((err)=>console.log(err))
    .finally(()=>{
        setsongloading(false)
    })

}

  return (
   {get_songs_handler,song,songloading}
  )
}

export default UseSongs

