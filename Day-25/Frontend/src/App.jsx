import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FaceExpression from './features/Expression/componenets/FaceExpression'

function App() {
  const [count, setCount] = useState(0)

  return (
  <FaceExpression />
  )
}

export default App
