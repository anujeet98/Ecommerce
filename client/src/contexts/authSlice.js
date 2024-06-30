
import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


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
            console.log(state);
        },
        logOut(state, action){
            state.isLoggedIn= false;
            state.token= null
            state.admin= false;
        },

    }
});


export const authActions = authSlice.actions;
export default authSlice.reducer;



export const signinAPI = (authObj) => {
    return (dispatch) => {
        (async()=>{
            try{
                // const apiURL = process.env.REACT_APP_BASEURL;
                // console.log(apiURL);
                axios.defaults.baseURL = `${process.env.REACT_APP_BASEURL}`;
                const res = await axios.post('http://localhost:3000/api/signin',{
                    email: authObj.email,
                    password: authObj.password,
                });
                
                localStorage.setItem('token', res.data.token);
                dispatch(authActions.logIn({token: res.data.token, role: res.data.role}));
                alert('Signin success');
                // dispatch(uiSliceActions.showNotification({title: 'Success!', status: 'success', message: 'Cart data fetched successfully!'}));
            }
            catch(err){
                if(err && err.response && err.response.data && err.response.data.error)
                    return alert(err.response.data.error);
                if(err && err.response && err.response.data && err.response.data.message)
                    return alert(err.response.data.message);
                alert('Signin failure');
                // dispatch(uiSliceActions.showNotification({title: 'Error!', status: 'error', message: 'Fetching cart data failed!'}));
            }
        })()
    }
}

export const signupAPI = (authObj) => {
    return (dispatch) => {
        (async()=>{
            try{
                // const apiURL = process.env.REACT_APP_BASEURL;
                axios.defaults.baseURL = `${process.env.REACT_APP_BASEURL}`;
                const res = await axios.post('http://localhost:3000/api/signup', {
                    email: authObj.email,
                    password: authObj.password,
                });

                
                // dispatch(authActions.logIn(state=>state.auth.auth.login(res.data.token)));
                alert('Signup success, kindly login');
                // dispatch(uiSliceActions.showNotification({title: 'Success!', status: 'success', message: 'Cart data fetched successfully!'}));
            }
            catch(err){
                if(err && err.response && err.response.data && err.response.data.error)
                    return alert(err.response.data.error);
                if(err && err.response && err.response.data && err.response.data.message)
                    return alert(err.response.data.message);
                alert('Signup failure');
                // dispatch(uiSliceActions.showNotification({title: 'Error!', status: 'error', message: 'Fetching cart data failed!'}));
            }
        })()
    }
}