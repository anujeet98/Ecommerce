import React, { useEffect } from 'react';
import classes from './Cart.module.css'
import Modal from '../Modal/Modal';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { cartActions } from '../../contexts/cartSlice';


const Cart = (props) => {    
    const cartCtx = useSelector(state=>state.cart.cart);
    const cartTotal = useSelector(state=>state.cart.total);
    const token = useSelector(state=>state.auth.token);
    const dispatch = useDispatch();

    useEffect(()=>{
        async function fetchCart(){
            try{
                const res = await axios.get('http://localhost:3000/api/cart',{
                    headers: {
                        Authorization: token
                    }
                });
                if(res.data){
                    dispatch(cartActions.updateCart({cart: res.data.items, total:res.data.total}));
                }
            }
            catch(err){
                console.log(err)
            }
        }
        fetchCart();
    },[dispatch, token]);

    if(!token)
        return alert('token expired. Kindly login again');

    const cartItems = []; 
    cartCtx.forEach((item,key) => {
        cartItems.push(<CartItem key={item.product} data={item}/>);
    });

    const checkoutHandler = async()=>{
        if(!token)
            return alert('token expired. Kindly login again');
        try{
            await axios.post('http://localhost:3000/api/order', null, {
                headers: {
                    Authorization: token
                }
            });
            dispatch(cartActions.emptyCart());
            alert('Thank you for shopping. Kindly find the bill sent to your email. Please check to spam if not found');
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <Modal onHideCart={props.onHideCart}>
            <ul className={classes.ul}>
                {cartItems}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>Rs. {cartTotal}</span>
            </div>
            <div className={classes.btnGrp}>
                <button className={classes['button--cancel']} onClick={props.onHideCart}>Close</button>
                <button className={classes.button} onClick={checkoutHandler}>Chekout</button>
            </div>
        </Modal>
    )
}

export default Cart;