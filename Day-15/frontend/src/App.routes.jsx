import {createBrowserRouter} from 'react-router-dom'
import Login from './features/Auth/pages/Login'
import Register from './features/Auth/pages/Register'
import Feed from './features/posts/pages/feed'
import CreatePost from './features/posts/pages/CreatePost'


export const router = createBrowserRouter([
     {
        path:'/login',
        element:< Login />
     },
     {
        path:'/register',
        element:<Register />
     },
     {
      path:'/',
      element:<Feed />
     },
     {
      path:'/create-post',
      element:<CreatePost />
     }
])