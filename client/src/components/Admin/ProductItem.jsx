import React from 'react'

function ProductItem({data}) {
  return (
    <div className='d-flex flex-column bg-danger-subtle px-3 rounded-3'>
        <div className='d-flex align-items-center justify-content-between'>
            <h3>{data.title}</h3>
            <div>
            
            </div>
        </div>
        <h4>Rs. {data.price}</h4>
    </div>
  )
}

export default ProductItem