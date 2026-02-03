import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'

function App() {
  const [notes, setNotes] = useState([])
  console.log('heelo');

  function fetchNotes(){
     axios.get('http://localhost:3000/api/notes')
  .then((res)=>{
    // console.log(res.data.note);
    setNotes(res.data.note)
  }
)}

  useEffect(()=>{
  fetchNotes()
    
  
  },[])
  function handleCreateNote(e){
    e.preventDefault()
    const {title,description} = e.target.elements
    console.log(title.value,description.value);
    axios.post('http://localhost:3000/api/notes',{
      title:title.value,
      description:description.value
    })
    .then((res)=>{
      console.log(res.data);
      fetchNotes()
    })
    // fetchNotes()
  }

  function handleDelete(noteId){
    // console.log(noteId)
    axios.delete('http://localhost:3000/api/notes/'+noteId)
    .then((res)=>{
      console.log(res.data);
      fetchNotes()
    })
  }

  function handleUpdate(noteId,e){
    e.preventDefault()
    // console.log(noteId);
     const { title, description } = document.forms[0].elements;

    console.log(description);
    axios.patch('http://localhost:3000/api/notes/'+noteId,{
      description:description.value
    })
    .then((res)=>{
      console.log(res.data);
      fetchNotes()
    })
    
  }
  
  return (
    <>
     <form onSubmit={handleCreateNote}>
        <input type="text" name="title" id="" placeholder='Enter Title' />
        <input type="text" name='description' placeholder='Enter description'/>
        <button>Create note</button>
      </form>
    <div className="notes">
     

      {
        notes.map((note,id) =>{
          return <div className="note" key={id}>
        <h1>{note.title}</h1>
        <p>{note.description}</p>
        <button onClick={()=>{
          handleDelete(note._id)
        }}>Delete</button>
        <button onClick={(e)=>{
          handleUpdate(note._id,e)
        }}>Update</button>
      </div>
        })
      }
      
    </div>
    </>
  )
}

export default App
