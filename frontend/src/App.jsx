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
import AddPets from './components/pages/pet/AddPets';
import EditPet from './components/pages/pet/EditPet';
import MyAdoptions from './components/pages/pet/MyAdoptions';
import MyPets from './components/pages/pet/MyPets';
import PetDetails from './components/pages/pet/PetDetails';
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
						<Route path='/pets/mypets' element={<MyPets />} />
						<Route path='/pets/add' element={<AddPets />} />
						<Route path='/pets/edit/:id' element={<EditPet />} />
						<Route path='/pets/myadoptions' element={<MyAdoptions />} />
						<Route path='/pets/:id' element={<PetDetails />} />
					</Routes>
				</Container>
				<Footer />
			</UserProvider>
		</Router>
	);
}

export default App;
