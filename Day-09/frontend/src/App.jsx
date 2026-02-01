import { useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'

function App() {
  const [notes, setNotes] = useState([])
  axios.get('http://localhost:3000/api/notes')
  .then((res)=>{
    // console.log(res.data.note);
    setNotes(res.data.note)
    
  })
  return (
    <>
    <div className="notes">
      {
        notes.map((note,id) =>{
          return <div className="note" key={id}>
        <h1>{note.title}</h1>
        <p>{note.description}</p>
      </div>
        })
      }
      
    </div>
    </>
  )
}

export default App
