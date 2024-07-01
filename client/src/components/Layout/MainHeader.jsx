// import CartButton from '../../../../../REACT/ReduxCart/src/components/Cart/CartButton';
import classes from './MainHeader.module.css';
import { Navbar, Container, Nav } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import {useDispatch, useSelector} from 'react-redux';
import { authActions } from '../../contexts/authSlice';
import { useNavigate } from 'react-router-dom';

const MainHeader = (props) => {
  const authContext = useSelector(state=>state.auth.isLoggedIn);
  const isAdmin = useSelector(state=>state.auth.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function authHandler(){
    if(authContext)
      dispatch(authActions.logOut());
    else  
      return navigate('/auth');
    }

  return (
    <Navbar className={classes.header} fixed='top'>
      <div className='d-flex align-items-center justify-content-between w-100'>
        <h1>SwiftCart</h1>
        <nav>
          <ul className='d-flex'>
            <li>
              <button onClick={authHandler} className='btn btn-info '>{authContext===false?'Login/SignIn':'Logout'}</button>
            </li>
            <li>
              <button className='d-flex align-items-center fs-5 justify-content-between gap-2 rounded-3 bg-transparent text-light'><FaShoppingCart/><div>{0}</div></button>
            </li>
          </ul>
        </nav>
      </div>
      <div className='me-auto'>
        <Navbar>
          <nav>
            <ul className='text-light d-flex list-unstyled gap-3 justify-content-start align-items-start'>
              <li className='btn p-0 text-white fs-5 border-0' onClick={()=>navigate('/')}>Home</li>
              {authContext && <li className='btn p-0 text-white fs-5 border-0' onClick={()=>navigate('/myorders')}>My Orders</li>}
              {isAdmin && <li className='btn p-0 text-white fs-5 border-0' onClick={()=>navigate('/admin')}>Admin</li>}
            </ul>
          </nav>
        </Navbar>
      </div>
    </Navbar>
  );
};

export default MainHeader;
