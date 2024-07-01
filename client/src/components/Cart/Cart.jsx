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
        if(!token)
            return alert('token expired. Kindly login again');
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
    },[]);

    const cartItems = []; 
    cartCtx.forEach((item,key) => {
        cartItems.push(<CartItem key={item.product} data={item}/>);
    });

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
                <button className={classes.button}>Chekout</button>
            </div>
        </Modal>
    )
}

export default Cart;