
import classes from './CartItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../contexts/cartSlice';
import axios from 'axios';

const addToCartAPI = async(token, cartItemObj) =>{
    try{
        const res = await axios.post('http://localhost:3000/api/cart', cartItemObj, {
            headers: {
                Authorization: token
            }
        });

        return res;
    }
    catch(err){
        throw new Error(err);
    }
}
const removeFromCartAPI = async(token, productId) =>{
    try{
        const res = await axios.delete('http://localhost:3000/api/cart/'+productId,{
            headers: {
                Authorization: token
            }
        });

        return res;
    }
    catch(err){
        throw new Error(err);
    }
}


const CartItem = (props) => {
    const dispatch = useDispatch();
    const token = useSelector(state=>state.auth.token);
    if(!token)
        return alert('Token expired. Kindly login again');


    const addItemHandler = async() => {
        const item = {...props.data, quantity: 1};
        try{
            await addToCartAPI(token, item);
            dispatch(cartActions.addToCart(item));
        }
        catch(err){
            console.log(err);
        }
    }

    const removeItemHandler = async() => {
        const item = {...props.data, quantity: 1};
        try{
            await removeFromCartAPI(token,item.product);
            dispatch(cartActions.removeFromCart({...props.data, quantity: 1}))
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <li className={classes["cartItem-li"]}>
            <div>
                <span className={classes["cartItem-id"]}>{props.data.product}</span>
                <div className={classes["cartItem-metadata"]}>
                    <span className={classes["cartItem-price"]}>Rs. {props.data.price}</span>
                    <div className={classes["cartItem-quantity"]}>x {props.data.quantity}</div>
                </div>
            </div>
            <div className={classes["item-btn-action-grp"]}>
                <button onClick={removeItemHandler}>-</button>
                <button onClick={addItemHandler}>+</button>
            </div>
        </li>
    )
}

export default CartItem;