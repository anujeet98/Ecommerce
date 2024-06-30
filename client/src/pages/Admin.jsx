import React, { Fragment, useState } from 'react'
import { Navbar } from 'react-bootstrap'
import AdminProducts from '../components/Admin/AdminProducts';
import AddProducts from '../components/Admin/AddProducts';
import Orders from '../components/Admin/Orders';

function Admin() {
  const [navItem, setNavItem] = useState(0);
  return (
    <Fragment>
      <div className='pt-2 d-flex justify-content-center'>
        <Navbar>
          <nav>
            <ul className='d-flex gap-4 justify-content-center align-items-center w-100'>
              <li className='btn p-0 text-white fs-5 border-0' onClick={()=>setNavItem(0)}>All Product</li>
              <li className='btn p-0 text-white fs-5 border-0' onClick={()=>setNavItem(1)}>Add Product</li>
              <li className='btn p-0 text-white fs-5 border-0' onClick={()=>setNavItem(2)}>Orders</li>
            </ul>
          </nav>
        </Navbar>
      </div>
      <div>
        {navItem===0 && <AdminProducts/>}
        {navItem===1 && <AddProducts/>}
        {navItem===2 && <Orders/>}
      </div>
    
    </Fragment>
  )
}

export default Admin