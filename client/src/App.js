import './App.css';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import { Route, Routes } from 'react-router';
import Admin from './pages/Admin';
import { useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom/cjs/react-router-dom';

function App() {
	const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
	const isAdmin = useSelector(state=>state.auth.admin);
    return (
		<>
			<Layout>
				<switch>
					<Routes>
						<Route path='/' element={<Home/>} exact />
						{!isLoggedIn} && <Route path='/auth' exact element={<Auth/>} />
						<Route path='/admin' exact element={isLoggedIn && isAdmin ? <Admin /> : <Home/>}/>
						<Route path='*' element={<Home/>} />
					</Routes>
				</switch>
			</Layout>
		</>
    );
}

export default App;
