import {createContext, useState, useEffect} from "react"

import { onAuthStateChangedListener, createUserDocumentFromAuth } from './../utils/firebase/firebase.utils';

// the actual value you want to access or default value
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

//this provider wraps around any other component that needs access 
//to the values inside the context... i,e the {children} are the components that need access
export const UserProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser}

    //using the observer pattern
    //empty [] means run this function just once when the component mounts for the first time..
    useEffect(()=>{
       const unsubscribe = onAuthStateChangedListener((user)=>{
        if(user){
            createUserDocumentFromAuth(user)
        }   
        setCurrentUser(user)
       })
       return unsubscribe
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

