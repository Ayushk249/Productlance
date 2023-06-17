import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// No need for any axios request or fetch request
export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts : builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5
        }),

        getProductDetail : builder.query({
            query : (productID) => ({
                url:`${PRODUCTS_URL}/${productID}`
            }),
            keepUnusedDataFor: 5 
        })
    })
})


// use...Query convention
export const {useGetProductsQuery,useGetProductDetailQuery} = productsApiSlice