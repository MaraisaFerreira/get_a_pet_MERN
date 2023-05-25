import formStyle from '../../form/Form.module.css';
import style from './Profile.module.css';

import { useState } from 'react';

import Input from '../../form/Input';

function Profile() {
	function handleOnChange(e) {}

	function handleFile(e) {}

	function handleSubmit(e) {
		e.preventDefault();
	}

	const [user, setUser] = useState({});

	return (
		<section>
			<div className={style.profile_header}>
				<h1>Perfil</h1>
				<p>Image preview</p>
			</div>
			<form className={formStyle.form_container} onSubmit={handleSubmit}>
				<Input
					type='text'
					text='Nome'
					name='name'
					placeholder='Digite seu nome'
					handleOnChange={handleOnChange}
					value={user.name || ''}
				/>
				<Input
					type='email'
					text='Email'
					name='email'
					placeholder='Digite seu email'
					handleOnChange={handleOnChange}
					value={user.email || ''}
				/>
				<Input
					type='text'
					text='Telefone'
					name='phone'
					placeholder='Digite seu telefone'
					handleOnChange={handleOnChange}
					value={user.phone || ''}
				/>
				<Input
					type='file'
					text='Foto'
					name='image'
					placeholder='Upload de imagem'
					handleOnChange={handleFile}
					value={user.name || ''}
				/>
				<Input
					type='password'
					text='Senha'
					name='password'
					placeholder='Digite sua senha'
					handleOnChange={handleOnChange}
				/>
				<Input
					type='password'
					text='Confirmação de senha'
					name='confirmPassword'
					placeholder='Confirme a sua senha'
					handleOnChange={handleOnChange}
				/>
				<Input
					type='password'
					text='Nova Senha'
					name='newPaswword'
					placeholder='Sua nova senha'
					handleOnChange={handleOnChange}
				/>
				<input type='submit' value='Editar' />
			</form>
		</section>
	);
}

export default Profile;
