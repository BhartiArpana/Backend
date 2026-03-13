import { RouterProvider } from 'react-router-dom'
import { router } from './features/App.routes'
import './/features/shared/global.scss'
import { AuthProvider } from './features/Auth/auth.context'
import { SongContextProvider } from './features/Home/song.context'

function App() {
  return (
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </AuthProvider>
    
  )
}

export default App
