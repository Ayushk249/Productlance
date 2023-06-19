// entry point for redux
import {configureStore} from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
import cartSliceReducer from './slices/cartSlice'

// takes an object called reducer
const store = configureStore({
    reducer:{
        [apiSlice.reducerPath] : apiSlice.reducer,
        cart : cartSliceReducer, 
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true, 
})

export default store