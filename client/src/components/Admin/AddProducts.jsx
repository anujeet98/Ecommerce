import axios from 'axios';
import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const productApi = async (product, prodObj, token) => {
  try{
    let res;
    if(!product)
      res = await axios.post('http://localhost:3000/api/products', prodObj, {
      headers: {
        Authorization: token
      }
    })
    else
      res = await axios.put('http://localhost:3000/api/products/'+`${product._id}`, prodObj, {
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

function AddProducts(props) {
  const product = props && props.product || null;
  const [title, setTitle] = useState(product? product.title : "");
  const [description, setDescription] = useState(product ? product.description : "");
  const [url, setUrl] = useState(product ? product['image_url'] : "");
  const [price, setPrice] = useState(product ? product.price : 0);
  const token = useSelector(state=>state.auth.token)

  async function AddProductHandler(e){
    e.preventDefault();
    if(!token)
      return alert('Authorization token expired. Kindly login again');
    if(!title)
        return alert('Invalid title provided');
    if(!description)
      return alert('Invalid description provided');
    if(!url)
      return alert('Invalid image url provided');
    if(!price)
      return alert('Invalid price provided');
    if(price<=0){
      return alert('Price must be > 0');
    }
    try{
      const res = await productApi(product, {
        title: title,
        description: description,
        price: price,
        image_url: url
      }, token);

      setTitle("");
      setDescription("");
      setPrice(0);
      setUrl("");
      alert(product?"Product updated successfully":"Product added successfullly");
      props.onEditCompletion();
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className='d-flex flex-column w-25 gap-2 mx-auto my-auto p-4'>
      <Form className='d-flex flex-column gap-2' onSubmit={(e)=>{AddProductHandler(e)}}>
          <Form.Control type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter title here'/>
          <Form.Control type='textarea'  value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter desciption here'/>
          <Form.Control type='text' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='Enter image url here'/>
          <Form.Control type='number' value={price} min={1} onChange={(e) => setPrice(e.target.value)} placeholder='Enter price here'/>
          <button type='submit' className='btn btn-primary'>{product ? 'Update Product':'Add Product'}</button>
      </Form>
    </div>
  )
}

export default AddProducts