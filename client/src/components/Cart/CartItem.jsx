
import classes from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../contexts/cartSlice';


const CartItem = (props) => {
    const dispatch = useDispatch();


    const addItemHandler = () => {
        const item = {...props.data, quantity: 1};
        delete item.description;
        dispatch(cartActions.addToCart(item));
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
                <button onClick={()=>dispatch(cartActions.removeFromCart(props.data.product))}>-</button>
                <button onClick={addItemHandler}>+</button>
            </div>
        </li>
    )
}

export default CartItem;