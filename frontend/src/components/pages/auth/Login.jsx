/* style */
import style from '../../form/Form.module.css';

import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

/* components */
import Input from '../../form/Input';

/* context */
import { Context } from '../../../context/UserContext';

function Login() {
	const [user, setUser] = useState({});

	const { login } = useContext(Context);

	function handleOnChange(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		login(user);
	}

	return (
		<section className={style.form_container}>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<Input
					text='Email'
					name='email'
					type='email'
					placeholder='Digite seu email'
					handleOnChange={handleOnChange}
				/>
				<Input
					text='Senha'
					name='password'
					type='password'
					placeholder='Digite sua senha...'
					handleOnChange={handleOnChange}
				/>
				<input type='submit' value='Entrar' />
			</form>
			<p>
				Não tem conta? <Link to='/register'>Click aqui.</Link>
			</p>
		</section>
	);
}

export default Login;
