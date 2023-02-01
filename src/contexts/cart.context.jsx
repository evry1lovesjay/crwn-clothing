import {createContext, useReducer} from 'react';

import {createAction} from "../utils/reducer/reducer.utils"

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem => cartItem.id === productToAdd.id))

    if(existingCartItem){
        return cartItems.map((cartItem)=> cartItem.id=== productToAdd.id? {...cartItem, quantity: cartItem.quantity+1} : cartItem)
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem => cartItem.id === cartItemToRemove.id))

    if(existingCartItem.quantity===1){
        return cartItems.filter((cartItem)=> cartItem.id!== cartItemToRemove.id)
    }

    return cartItems.map((cartItem)=> cartItem.id=== cartItemToRemove.id? {...cartItem, quantity: cartItem.quantity-1} : cartItem)

}

const clearCartItem = (cartItems, cartItemToClear)=>{
    return cartItems.filter((cartItem)=> cartItem.id!== cartItemToClear.id)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    cartItems: [],
    addItemToCart: ()=>{},
    removeItemFromCart: ()=>{},
    clearItemFromCart: ()=>{},
    cartCount: 0,
    CartTotal: 0,
})


//step 7... (should have been 2 or 3)
const CART_ACTION_TYPES = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
}

// step 1 ... initial state for useReducer
const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    CartTotal: 0,
}

// step 2.... the cartReducer
const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload 
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            }
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`)

    }
}




export const CartProvider = ({children})=>{
    // const [isCartOpen, setIsCartOpen] = useState(false)
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0)
    // const [cartTotal, setCartTotal] = useState(0)

    // useEffect(()=>{
    //     const newCartCount = cartItems.reduce((total, cartItem)=>total + cartItem.quantity, 0)
    //     setCartCount(newCartCount)
    // },[cartItems])

    // useEffect(()=>{
    //     const newCartTotal = cartItems.reduce((total, cartItem)=>total + cartItem.quantity * cartItem.price, 0)
    //     setCartTotal(newCartTotal)
    // },[cartItems])


    //step 5... replaces all the commented code above.
    const [{isCartOpen, cartItems, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE)



    //step 4........
    const updateCartItemsReducer = (newCartItems) => {
        // copied from effect above....
        const newCartCount = newCartItems.reduce((total, cartItem)=>total + cartItem.quantity, 0)

        //copied from effect above.....
        const newCartTotal = newCartItems.reduce((total, cartItem)=>total + cartItem.quantity * cartItem.price, 0)
    
    //step 6..... dispatch
        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartCount: newCartCount})
            )
    }

    // step 3... cast into a variable called newCartItems instead of set.
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems)
    }
    
    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove)
        updateCartItemsReducer(newCartItems)
    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear)
        updateCartItemsReducer(newCartItems)
    }


    const setIsCartOpen = (bool) => {
        dispatch(
            createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal}
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}