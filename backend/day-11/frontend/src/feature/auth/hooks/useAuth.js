import {useContext} from "react";
import { AuthContext } from "../auth.context"
import {login, register, getMe} from "../services/auth.api"


export function useAuth(){
    const context = useContext(AuthContext)

    const {user, loading, setUser,setLoading}= context



    const handleLogin = async(username,password)=>{
        setLoading(true)
        try{
            const response = await login(username,password)
            setUser(response.user)
            return response
        }
        catch(err){
            console.log(err)
            throw err
        }
        finally{
            setLoading(false)
        }
        
    }

    const handleRegister = async(username, email, password)=>{
        setLoading(true)
        try {
            const response = await register(username, email, password)
            setUser(response.user)
            return response
            
        } catch (error) {
            console.log(error)
            throw error
        }
        finally{
            setLoading(false)
        }
    }


   
    return(
        // <AuthContext.Provider value={{user, loading, handleLogin, handleRegister}}>
        //     {children}
        // </AuthContext.Provider>

        user, loading, handleLogin, handleRegister
    )
    
}