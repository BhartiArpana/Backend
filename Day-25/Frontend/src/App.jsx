import { RouterProvider } from 'react-router-dom'
import { router } from './features/App.routes'
import './/features/shared/global.scss'
import { AuthProvider } from './features/Auth/auth.context'

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    
  )
}

export default App
