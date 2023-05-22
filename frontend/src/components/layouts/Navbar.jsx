import { Link } from 'react-router-dom';

import Logo from '../../assets/img/cat.png';

function Navbar() {
	return (
		<nav>
			<div>
				<img src={Logo} alt='Get A Pet' />
				<h2>Get A Pet</h2>
			</div>
			<ol>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/login'>Login</Link>
				</li>
				<li>
					<Link to='/register'>Cadastrar</Link>
				</li>
			</ol>
		</nav>
	);
}

export default Navbar;
