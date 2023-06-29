import { apiSlice } from './apiSlice'
import { ORDERS_URL,PAYPAL_URL } from '../constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: "POST",
                body: {...order}
            })
        }),

        getOrderDetails : builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`
            }),
            keepUnusedDataFor: 5.
        }),

        payOrder: builder.mutation({
            query: ({orderId, details}) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: "PUT",
                body: {...details}
            })
        }),

        // to get client ID from backend
        getPaypalClientId: builder.query({
            query: () => ({
                url: `${PAYPAL_URL}/clientId`,
            }),
            keepUnusedDataFor: 5.
        })

    })
})



export const { useCreateOrderMutation, useGetOrderDetailsQuery,usePayOrderMutation,useGetPaypalClientIdQuery } = ordersApiSlice;