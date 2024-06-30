import React, { useEffect, useState } from 'react'
import classes from '../styles/Home.module.css';
import { sampleProducts } from '../sample/products';
import ProductItem from '../components/Product/ProductItem';
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
function Home() {
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
        <div className={classes.outer}>
            <h1>Product List</h1>
            <ul className={classes.productGrid}>
                {products.map(product => <ProductItem key={product._id} data={product} />)}
            </ul>
        </div>
    )
}

export default Home;