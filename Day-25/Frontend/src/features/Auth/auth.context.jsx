import { Children, createContext, useState } from "react";

export const AuthContext = createContext()
export const AuthProvider = ({children})=>{
    const [loading, setloading] = useState(true)
    const [user, setUser] = useState(null)

    return <AuthContext.Provider  value={{loading,setloading,user,setUser}}>
        {children}
    </AuthContext.Provider>
}