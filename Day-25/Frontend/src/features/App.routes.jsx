import {createBrowserRouter} from 'react-router-dom'
import Login from './Auth/pages/Login'
import Register from './Auth/pages/Register'
import Protected from './Auth/components/Protected'
import Home from './Home/pages/Home'


export const router = createBrowserRouter([
    {
       path:'/',
       element:<Protected ><Home /></Protected>
    },
    {
        path:'/login',
        element:<Login />
    },
    {
        path:'/register',
        element:<Register />
    }
])