import { createContext, useState } from "react";

export const SongContext = createContext()


export const SongContextProvider = ({children})=>{
    const [song, setSong] = useState({
        "url": "https://ik.imagekit.io/fe1vmmkus/cohort-2/moodify/songs/Pushpa_Pushpa__From__Pushpa_2_The_Rule____-_Hindi__DownloadMing.WS_mp3_eiYAJhUSc",
     "posterUrl": "https://ik.imagekit.io/fe1vmmkus/cohort-2/moodify/posters/Pushpa_Pushpa__From__Pushpa_2_The_Rule____-_Hindi__DownloadMing.WS__uCHMq98uR.jpeg",
       "title": "Pushpa Pushpa (From \"Pushpa 2 The Rule\")  - Hindi [DownloadMing.WS]",
            "mood": "happy",
    })

    const [loading, setLoading] = useState(false)

    return(
        <SongContext.Provider value={{loading,setLoading,song,setSong}}>
            {children}
        </SongContext.Provider>
    )
}