
export const DecimalsHelper = (num) => {
    return (Math.round(num*100)/100).toFixed(2) 
}

export const updateCart = (state)=> {
    state.itemsPrice = DecimalsHelper(state.cartItems.reduce((acc,item) => acc+item.price * item.qty,0))
            state.shippingPrice = DecimalsHelper(state.itemsPrice<5000? 100 : 0);
            state.taxprice = DecimalsHelper(Number((state.itemsPrice * 0.18).toFixed(2)))
            state.totalPrice = (
                Number(state.itemsPrice) +
                Number(state.shippingPrice) +
                Number(state.taxprice)).toFixed(2)

            
            localStorage.setItem('cart',JSON.stringify(state))

            return state
}