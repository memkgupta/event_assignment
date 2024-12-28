import axios from "axios";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie"
import { BACKEND_URL } from "@/constants";
interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    setUser:(user:User)=>void
    logout: () => void;
    error:string | null;
    isLoading:boolean
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
const [error,setError] = useState<string|null>(null);
const [isLoading,setIsLoading] = useState(false);
  const getSession = async()=>{
    const cookie = Cookies.get('token')
    if(!cookie){
        setUser(null);
        return;
    }
    try {
setIsLoading(true);
        const res = await axios.get(`${BACKEND_URL}/user/me`,{headers:{
            Authorization:`Bearer ${cookie}`
        }});
        setUser(res.data);
    
    } catch (error:any) {
        setError(error.message);
    }
    finally{
        setIsLoading(false);
    }
  }

   

    const logout = () => {
        setUser(null);
    };
useEffect(()=>{
    getSession();
},[])
    return (
        <AuthContext.Provider value={{ user,isLoading, setUser,error,logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
