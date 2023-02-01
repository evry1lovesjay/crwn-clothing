import {createContext, useEffect, useReducer} from "react"

import { onAuthStateChangedListener, createUserDocumentFromAuth } from './../utils/firebase/firebase.utils';

import {createAction}  from "../utils/reducer/reducer.utils"

// the actual value you want to access or default value
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

//This is a constant to hold the action types
export const USER_ACTION_TYPES = {
    "SET_CURRENT_USER": "SET_CURRENT_USER"
}

//This is the Reducer code thats replaces the context code.
const userReducer = (state, action) =>{
    const {type, payload} = action;

    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`)
    }
}

const INITIAL_STATE ={
    currentUser: null
}


//this provider wraps around any other component that needs access 
//to the values inside the context... i,e the {children} are the components that need access
export const UserProvider = ({children})=>{
    
    // commented out the use state below, because we are switching to useReducers...
    // const [currentUser, setCurrentUser] = useState(null);

    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE)

    const {currentUser} = state
 
    const setCurrentUser = (user) => {
        dispatch(createAction( USER_ACTION_TYPES.SET_CURRENT_USER, user))
    }

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

