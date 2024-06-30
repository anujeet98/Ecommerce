import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem';
import axios from 'axios';

const fetchProducts = async() => {
  try{
      const products = await axios.get('http://localhost:3000/api/products');
      return products.data
  }
  catch(err){
      throw new Error(err);
  }
}

function AdminProducts() {
  const [products, setProducts] = useState([]);
  useEffect(()=>{
      async function fetchData(){
          try{
              const fetchedProducts = await fetchProducts();
              setProducts(fetchedProducts);
          }
          catch(err){
              console.log(err);
          }
      }
      fetchData();
  },[setProducts]);
  return (
    <div className='px-5'>
      <ul className='d-flex flex-column gap-2'>      
          {products.map(product => <ProductItem key={product._id} data={product} />)}
      </ul>
    </div>
  )
}

export default AdminProducts