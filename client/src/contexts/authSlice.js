
import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    isLoggedIn: false,
    token: null,
    admin: false,
    logIn: ()=>{},
    logOut: ()=>{},
}
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        logIn(state, action){
            if(action.payload.token){
                state.isLoggedIn= true;
                state.token= action.payload.token;
                state.admin= action.payload.role==='admin';
            }
        },
        logOut(state, action){
            stae.isLoggedIn= false;
            state.token= null
            state.admin= false;
        },

    }
});


export const authActions = authSlice.actions;
export default authSlice.reducer;