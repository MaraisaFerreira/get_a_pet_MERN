import { Link } from 'react-router-dom';

import Input from '../../form/Input';

/* css */
import style from '../../form/Form.module.css';

function Register() {
	function handleOnChange(e) {}

	return (
		<section className={style.form_container}>
			<h1>Cadastrar</h1>
			<form>
				<Input
					type='text'
					text='Nome:'
					name='name'
					placeholder='Digite seu nome'
					handleOnChange={handleOnChange}
				/>
				<Input
					type='text'
					text='Email:'
					name='email'
					placeholder='Digite seu email'
					handleOnChange={handleOnChange}
				/>
				<Input
					type='text'
					text='Telefone:'
					name='phone'
					placeholder='Digite seu telefone'
					handleOnChange={handleOnChange}
				/>
				<Input
					type='password'
					text='Senha:'
					name='password'
					placeholder='Digite a senha'
					handleOnChange={handleOnChange}
				/>
				<Input
					type='password'
					text='Confirmação da senha:'
					name='confirmPassword'
					placeholder='Confirme a senha'
					handleOnChange={handleOnChange}
				/>
				<input type='submit' value='Cadastrar' />
			</form>
			<p>
				Já possui cadastro? <Link to='/login'>Click aqui.</Link>
			</p>
		</section>
	);
}

export default Register;
