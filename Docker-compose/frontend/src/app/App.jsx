import { useState ,useEffect} from 'react'
import './App.css'
import axios from 'axios'

function App() {
const [user, setUser] = useState(null)

useEffect(() => {
    axios.get('/api/users')
    .then(response=>{
      setUser(response.data)
    })
},[])
  return (
    <div className="App">
      {user && (
        <div>
          <h2>Users</h2>
          <ul>
            {user.map((u) => (
              <li key={u.id}>{u.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
