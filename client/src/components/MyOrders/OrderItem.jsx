import React from 'react'

function OrderItem({data}) {
  return (
    <div className='d-flex flex-column bg-danger-subtle px-3 rounded-3'>
        <h3>Order ID : {data._id}</h3>
        <h3>Items : </h3>
        <hr></hr>
        <ul>
        {data.items.map(item=>{
            return <li className='d-flex flex-column'>
                <h3>Product ID : {item.product}</h3>
                <h3>Quantity : {item.quantity}</h3>
                <h3>Price : {item.price}</h3>
                <hr></hr>
            </li>

        })}
        </ul>
    </div>
  )
}

export default OrderItem