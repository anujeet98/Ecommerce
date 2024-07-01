import { createSlice } from '@reduxjs/toolkit';

const initialState={
    cart:[],
    showCart: false,
    total: 0,
    toggleViewCart: ()=>{},
    addToCart: ()=>{},
    removeFromCart: ()=>{},
    setTotal: ()=>{},

};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, payload){

        },
        removeFromCart(state, payload){

        },
        updateCart(state, payload){
            state.cart=payload.payload.cart;
            state.total=payload.payload.total;
        },
        toggleViewCart(state, payload){
            state.showCart=!state.showCart;
        },
        setTotal(state, payload){
            state.total=payload.total;
        },

    }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;