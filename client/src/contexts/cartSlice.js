import { create } from "domain";

const { createSlice } = require("@reduxjs/toolkit");



const initialState={
    cart:[],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart(){

        },
        removeFromCart(){

        },
        updateCart(){
            
        }
    }
});

export const cartActions = createSlice.actions;
export default createSlice.reducers;