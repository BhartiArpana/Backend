import { router } from "./App.routes"
import { RouterProvider } from "react-router-dom"
import './global.scss'
import { AuthContext, AuthProvider } from "./features/Auth/auth.context"
import { PostContextProvide } from "./features/posts/post.context"

function App() {
  return (
    <AuthProvider>
      <PostContextProvide>
         <RouterProvider router={router} />
      </PostContextProvide>
    </AuthProvider>
     
  )
}

export default App
