import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

/* pages */
import Home from './components/pages/Home';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';

/* components */
import Footer from './components/layouts/Footer';
import Navbar from './components/layouts/Navbar';

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/' element={<Home />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
