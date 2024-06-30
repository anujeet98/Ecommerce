// import CartButton from '../../../../../REACT/ReduxCart/src/components/Cart/CartButton';
import classes from './MainHeader.module.css';
import { Navbar, Container, Nav } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import {useDispatch, useSelector} from 'react-redux';
import { authActions } from '../../contexts/authSlice';
import { useNavigate } from 'react-router-dom';

const MainHeader = (props) => {
  const authContext = useSelector(state=>state.auth.isLoggedIn);
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
      <div className='d-flex align-items-center justify-content-center'>
        <h1>MERN Ecomm</h1>
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
      <div>
        <Navbar>
          <nav>
            <ul>
              <li>Home</li>
              <li>Admin</li>
            </ul>
          </nav>
        </Navbar>
      </div>
    </Navbar>
  );
};

export default MainHeader;
