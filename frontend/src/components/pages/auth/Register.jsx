import Input from '../../form/Input';

function Register() {
	function handleOnChange(e) {}

	return (
		<section>
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
				<button type='submit'>Cadastrar</button>
			</form>
		</section>
	);
}

export default Register;
