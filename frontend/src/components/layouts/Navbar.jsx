import { useContext } from 'react';
import { Link } from 'react-router-dom';

/* assets */
import Logo from '../../assets/img/cat.png';

/* css */
import style from './Navbar.module.css';

/* context */
import { Context } from '../../context/UserContext';

function Navbar() {
	const { authenticated, logout } = useContext(Context);

	return (
		<nav className={style.navbar}>
			<div className={style.navbar_logo}>
				<img src={Logo} alt='Get A Pet' />
				<h2>Get A Pet</h2>
			</div>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				{authenticated ? (
					<>
						<li>
							<Link to='/pets/myadoptions'>Minhas Adoções</Link>
						</li>
						<li>
							<Link to='/pets/mypets'>Meus Pets</Link>
						</li>
						<li>
							<Link to='/users/profile'>Perfil</Link>
						</li>
						<li onClick={logout}>Sair</li>
					</>
				) : (
					<>
						<li>
							<Link to='/login'>Login</Link>
						</li>
						<li>
							<Link to='/register'>Cadastrar</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}

export default Navbar;
