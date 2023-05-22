import { Link } from 'react-router-dom';

/* assets */
import Logo from '../../assets/img/cat.png';

/* css */
import style from './Navbar.module.css';

function Navbar() {
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
				<li>
					<Link to='/login'>Login</Link>
				</li>
				<li>
					<Link to='/register'>Cadastrar</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
