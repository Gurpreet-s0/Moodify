import React, { useEffect, useState } from 'react'
import EmotionDetectPage from './EmotionDetectPage'
import UseSongs from "../Hooks/UseSongs";
import SongPlayer from '../Components/SongPlayer';

const Home = () => {
    const [expression, setexpression] = useState(null)
    const { song, songloading, get_songs_handler } = UseSongs();

  useEffect(() => {
     get_songs_handler(expression);
  }, [expression]);

  return (
    <div className="min-h-screen pb-36">
        <EmotionDetectPage setexpression={setexpression} />
        <SongPlayer song={song} loading={songloading} />
    </div>
  )
}

export default Home
