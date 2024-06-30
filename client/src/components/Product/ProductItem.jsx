
import React from 'react'
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { Button } from 'bootstrap';

function ProductItem({data}) {
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{data.title}</h3>
        </header>
        <div>
            <img src={data.image_url} className={classes.image}></img>
            <p>{data.description}</p>
        </div>
        <footer className='d-flex align-items-center justify-content-between'>
            <p className='fs-4  fw-bolder'>Rs. {data.price}</p>
            <button className="btn btn-danger">Add to Cart</button>
        </footer>
      </Card>
    </li>
  )
}

export default ProductItem;

