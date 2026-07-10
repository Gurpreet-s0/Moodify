import { createContext, useState } from "react";

export const SongContext = createContext()

const SongContextProvider = function({children}){
    const [song, setsong] = useState(null)
    const [songloading, setsongloading] = useState(false)


   return (
   <SongContext.Provider value={{song,setsong,songloading,setsongloading}} >
        {children}
    </SongContext.Provider>
   )
}

export default SongContextProvider