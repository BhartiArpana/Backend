import React from 'react'
import FaceExpression from '../../Expression/componenets/FaceExpression'
import Player from './Player'
import {useSong} from '../Hooks/useSong'

const Home = () => {
  const {handleGetSong} = useSong()
  return (
    <div style={{ paddingBottom: '100px' }}>
      <FaceExpression onClick={(expression)=>{handleGetSong({mood:expression} )}} />
      <Player />
    </div>
  )
}

export default Home