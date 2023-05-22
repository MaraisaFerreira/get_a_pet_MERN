import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

/* pages */
import Home from './components/pages/Home';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';

/* components */
import Container from './components/layouts/Container';
import Footer from './components/layouts/Footer';
import Navbar from './components/layouts/Navbar';

function App() {
	return (
		<Router>
			<Navbar />
			<Container>
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/' element={<Home />} />
				</Routes>
			</Container>
			<Footer />
		</Router>
	);
}

export default App;
