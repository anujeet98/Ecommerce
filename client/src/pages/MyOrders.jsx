import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import OrderItem from '../components/MyOrders/OrderItem';
const fetchOrders = async(token) => {
    try{
        const orders = await axios.get('http://localhost:3000/api/order',{
            headers: {
                Authorization: token
            }
        });
        return orders.data
    }
    catch(err){
        throw new Error(err);
    }
}
function MyOrders() {
    const [orders, setOrders] = useState([]);
    const token = useSelector(state=>state.auth.token);
    useEffect(()=>{
        async function fetchData(){
            if(!token)
                return alert('Auth token has expired. Kindly login again');
            try{
                const fetchedOrders = await fetchOrders(token);
                setOrders(fetchedOrders);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[setOrders]);
  return (
    <div className='px-5 pt-5 pb-5'>
      <ul className='d-flex flex-column gap-2'>      
          {orders.map(order => <OrderItem key={order._id} data={order} />)}
      </ul>
    </div>
  )
}

export default MyOrders