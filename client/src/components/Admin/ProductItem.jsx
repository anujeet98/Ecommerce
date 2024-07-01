import React from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from 'react-icons/fa';

function ProductItem({data}) {
  return (
    <div className='d-flex flex-column bg-danger-subtle px-3 rounded-3'>
        <div className='d-flex align-items-center justify-content-between'>
            <h3>{data.title}</h3>
            <div className='d-flex align-items-center gap-3 fs-3'>
                <button className='p-0 m-0 border-0 bg-transparent'><FaEdit className='' /></button>
                <button className='p-0 m-0 border-0 bg-transparent'><MdDelete className='text-danger' /></button>
            </div>
        </div>
        <h4>Rs. {data.price}</h4>
    </div>
  )
}

export default ProductItem