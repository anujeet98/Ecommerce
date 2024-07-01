import './App.css';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import { Route, Routes } from 'react-router';
// import { Switch } from 'react-router-dom'
import Admin from './pages/Admin';
import { useDispatch, useSelector } from 'react-redux';
import MyOrders from './pages/MyOrders';
import Cart from './components/Cart/Cart';
import { cartActions } from './contexts/cartSlice';
// import { Redirect } from 'react-router-dom/cjs/react-router-dom';

function App() {
	const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
	const isAdmin = useSelector(state=>state.auth.admin);
	const showCart = useSelector(state=>state.cart.showCart);
	const dispatch = useDispatch();
	const hideCartHandler = () => {
		dispatch(cartActions.toggleViewCart());
	  };
    return (
		<>
			{showCart ? <Cart onHideCart={hideCartHandler} /> : ""}
			<Layout>
				
					<Routes>
						<Route path='/' element={<Home/>} exact />
						{!isLoggedIn} && <Route path='/auth' exact element={<Auth/>} />
						<Route path='/admin' exact element={isLoggedIn && isAdmin ? <Admin /> : <Home/>}/>
						{isLoggedIn} && <Route path='/myorders' exact element={isLoggedIn ? <MyOrders /> : <Home/>}/>
						<Route path='*' element={<Home/>} />
					</Routes>
				
			</Layout>
		</>
    );
}

export default App;
