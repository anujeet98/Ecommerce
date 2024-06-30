import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { signinAPI, signupAPI } from '../contexts/authSlice';
import { useNavigate } from 'react-router';



function Auth() {
    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function toggleHandler(){
        setIsLogin(isLogin=>!isLogin);
    }

    async function authHandler(e){
        e.preventDefault();
        var validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!email && email.trim().length===0 && !validRegex.test(email))
            return alert('Invalid email provided');
        if(!password && password.trim().length===0)
            return alert('Invalid password provided');
        if(password.length<6)
            return alert('Password length must be > 6');
        if(isLogin)
            await dispatch(signinAPI({email: email, password:password}));
        else
            await dispatch(signupAPI({email: email, password:password}));

        setEmail("");
        setPassword("");
        if(!isLogin){
            setIsLogin(true);
        }
        else
            navigate('/');
            
        
    }
    return (
        <div className='d-flex flex-column w-25 gap-2 mx-auto my-auto p-4'>
        <Form className='d-flex flex-column gap-2' onSubmit={(e)=>authHandler(e)}>
            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email here'></input>
            <input type='password'  value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password here'></input>
            <button type='submit' className='btn btn-primary'>{isLogin===true?'Login':'Signin'}</button>
        </Form>
        <button className='btn btn-primary bg-transparent border-0' onClick={toggleHandler}>{isLogin===true?'Create a new account?':'Already have account?'}</button>
        </div>
  )
}

export default Auth