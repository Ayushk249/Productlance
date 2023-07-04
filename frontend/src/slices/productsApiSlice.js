import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// No need for any axios request or fetch request
export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts : builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            // to avoid refreshing the data if new product is added 
            providesTags: ['Products'],
            keepUnusedDataFor: 5
        }),

        getProductDetail : builder.query({
            query : (productID) => ({
                url:`${PRODUCTS_URL}/${productID}`
            }),
            keepUnusedDataFor: 5 
        }),

        createProduct : builder.mutation({
            query : () => ({
                url: PRODUCTS_URL,
                method: 'POST',
            }),
            invalidatesTags: ['Products'],
            // stops data from being cached and forces a refetch
        }), 

        updateProduct : builder.mutation({
            query : (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),

        uploadProductImage : builder.mutation({
            query : (data) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data,
            }),
        }),

        deleteProduct : builder.mutation({
            query : (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            }),
            // invalidatesTags: ['Products'],
        }),


        createReview : builder.mutation({
            query : (data) => ({
                url: `${PRODUCTS_URL}/${data.id}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),

        // not require get query to fetch reviews as it is already fetched in getProducts query
    })
})


// use...Query convention
export const {useGetProductsQuery,
    useGetProductDetailQuery,
    useCreateProductMutation ,
    useUpdateProductMutation, 
    useUploadProductImageMutation,
    useDeleteProductMutation,
    useCreateReviewMutation} = productsApiSlice