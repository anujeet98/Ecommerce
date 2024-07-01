
import React from 'react'
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
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

function ProductItem({data}) {
  const dispatch = useDispatch();
  const token = useSelector(state=>state.auth.token);
  const addToCartHandler = async(data)=>{
    if(!token)
      return alert('Token expired. Kindly login again');
    try{
      await addToCartAPI(token, {
        product: data._id,
        quantity: 1 
      });
      dispatch(cartActions.addToCart({
        product: data._id,
        quantity: 1,
        price: data.price,
      }));
  }
  catch(err){
      console.log(err);
  }

  }
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{data.title}</h3>
        </header>
        <div>
            <img src={data.image_url} className={classes.image} alt={data.title}></img>
            <p>{data.description}</p>
        </div>
        <footer className='d-flex align-items-center justify-content-between'>
            <p className='fs-4  fw-bolder'>Rs. {data.price}</p>
            <button className="btn btn-danger" onClick={()=>{addToCartHandler(data)}}>Add to Cart</button>
        </footer>
      </Card>
    </li>
  )
}

export default ProductItem;

