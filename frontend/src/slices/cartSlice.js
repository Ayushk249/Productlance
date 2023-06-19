import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems: []}



const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers : {
        // adding to cart functionality
        addToCart: (state,action) => { 
            const item = action.payload;
            const existitem = state.cartItems.find((x) =>(x._id===item._id))

            if(existitem){
                state.cartItems= state.cartItems.map((x) => (x._id===existitem._id ? item : x))
            }else{
                state.cartItems= [...state.cartItems,item]
            }

            // total price
            return updateCart(state)
        },

        removeFromCart : (state,action) => {
            state.cartItems = state.cartItems.filter((x)=> x._id !== action.payload)

            return updateCart(state)
        }
    }
})

export const {addToCart,removeFromCart} = cartSlice.actions
export default cartSlice.reducer