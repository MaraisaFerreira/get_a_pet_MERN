import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

/* pages */
import Home from './components/pages/Home';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';

/* components */
import Container from './components/layouts/Container';
import Footer from './components/layouts/Footer';
import Message from './components/layouts/Message';
import Navbar from './components/layouts/Navbar';
import Profile from './components/pages/user/Profile';

/* context */
import { UserProvider } from './context/UserContext';

function App() {
	return (
		<Router>
			<UserProvider>
				<Navbar />
				<Message />
				<Container>
					<Routes>
						<Route path='/login' element={<Login />} />
						<Route path='/users/profile' element={<Profile />} />
						<Route path='/register' element={<Register />} />
						<Route path='/' element={<Home />} />
					</Routes>
				</Container>
				<Footer />
			</UserProvider>
		</Router>
	);
}

export default App;
