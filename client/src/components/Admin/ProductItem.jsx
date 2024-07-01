import React from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { useSelector } from 'react-redux';

function ProductItem({data, onDelete}) {
    const token = useSelector(state=>state.auth.token);
    async function deleteProductHandler(id){
        const conf = window.confirm('Kindly confirm before you proceed to delete this product');
        if(!conf)
            return;
        if(!token)
            return alert('Token has expired. Kindly login again');
        try{
            const res = await axios.delete('http://localhost:3000/api/products/'+id,{
                headers: {
                    Authorization: token
                }
            });

            onDelete(data._id);
            alert('Product deleted successfully');
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <div className='d-flex flex-column bg-danger-subtle px-3 rounded-3'>
        <div className='d-flex align-items-center justify-content-between'>
            <h3>{data.title}</h3>
            <div className='d-flex align-items-center gap-3 fs-3'>
                <button className='p-0 m-0 border-0 bg-transparent'><FaEdit className='' /></button>
                <button onClick={()=>deleteProductHandler(data._id)} className='p-0 m-0 border-0 bg-transparent'><MdDelete className='text-danger' /></button>
            </div>
        </div>
        <h4>Rs. {data.price}</h4>
    </div>
  )
}

export default ProductItem