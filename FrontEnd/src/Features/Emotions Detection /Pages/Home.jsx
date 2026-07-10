import React, { useEffect } from 'react'
import EmotionDetectPage from './EmotionDetectPage'
import UseSongs from "../Hooks/UseSongs";

const Home = () => {
    const { song, get_songs_handler } = UseSongs();

  useEffect(() => {
     get_songs_handler("sad");
  }, []);

  return (
    <div>
        <EmotionDetectPage/>
    </div>
  )
}

export default Home