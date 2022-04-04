import {createContext, useState} from "react"

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

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

