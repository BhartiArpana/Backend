import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  function handleincrease(){
    setCount(count+1)
  }
  function handleDecrease(){
    setCount(count-1)
  }

  return (
    <>
    <h1>{count} </h1>
    <button onClick={handleincrease} className='countBtn'>increase</button>
    <button onClick={handleDecrease} className='countBtn'>decrease</button>
    </>
  )
}

export default App
