import { createContext,useContext,useEffect, useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged,signOut} from 'firebase/auth';
import { auth } from '../firebase';


export const authContext = createContext();


export const useAuth = () => {
    const context = useContext(authContext);
    if(!context) throw new Error('THERE IIS NOT PROVIDER');
    return context;     
}


export function AuthProvider ({children}) {



    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);


    //crear usuario
    const signup =  (email,password) => {
        //async await a la funcion
        //console.log(email, password)
        return createUserWithEmailAndPassword(auth,email,password)
    }


    //login
    const login = (email,password) => {
        return signInWithEmailAndPassword (auth,email,password)
    }

    //cerrar sesion
    const logout = () => signOut(auth);
    

    useEffect(()=>{

       const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();

    },[])

    return (
        <authContext.Provider value={{signup,login,user,logout,loading}}>
            {children}
        </authContext.Provider>
    )



}