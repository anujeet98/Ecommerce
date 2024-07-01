import { createSlice } from '@reduxjs/toolkit';

const initialState={
    cart:[],
    showCart: false,
    total: 0,
    toggleViewCart: ()=>{},
    addToCart: ()=>{},
    removeFromCart: ()=>{},
    setTotal: ()=>{},
    emptyCart: ()=>{},
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, payload){
            const prod = payload.payload;
            const index = state.cart.findIndex(item=>item.product===prod.product);
            if(index>=0){
                state.cart[index].quantity++;
                state.total+=prod.price;
            }
            else{
                state.cart.push(prod);
                state.total+=prod.price;
            }
        },
        removeFromCart(state, payload){
            const prod = payload.payload;
            const index = state.cart.findIndex(item=>item.product===prod.product);
            if(index>=0){
                state.cart[index].quantity--;
                if(state.cart[index].quantity===0)
                    state.cart.splice(index, 1);
                state.total-=prod.price;
            }
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
        emptyCart(state, payload){
            state.cart=[];
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;