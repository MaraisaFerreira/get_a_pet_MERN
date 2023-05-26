/* styles */
import formStyle from '../../form/Form.module.css';
import style from './Profile.module.css';

import { useEffect, useState } from 'react';

/* components */
import Input from '../../form/Input';

/* api */
import api from '../../../utils/api';

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage';

function Profile() {
	const [user, setUser] = useState({});
	const [preview, setPreview] = useState();
	const [token] = useState(localStorage.getItem('token') || '');
	const { setFlashMessage } = useFlashMessage();

	function handleOnChange(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
	}

	function handleFile(e) {
		setPreview(e.target.files[0]);
		setUser({ ...user, [e.target.name]: e.target.files[0] });
		console.log(preview);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		let msgType = 'success';

		const formData = new FormData();
		await Object.keys(user).forEach((key) => formData.append(key, user[key]));

		const data = await api
			.patch('/users/edit', formData, {
				headers: {
					Authorization: `Bearer ${JSON.parse(token)}`,
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((response) => {
				return response.data;
			})
			.catch((err) => {
				msgType = 'error';
				return err.response.data;
			});

		setFlashMessage(data.message, msgType);
	}

	useEffect(() => {
		api
			.get('/users/checkuser', {
				headers: {
					Authorization: `Bearer ${JSON.parse(token)}`,
				},
			})
			.then((response) => {
				setUser(response.data);
			});
	}, [token]);

	return (
		<section>
			<div className={style.profile_header}>
				<h1>Perfil</h1>
				{(user.image || preview) && (
					<img
						src={
							preview
								? URL.createObjectURL(preview)
								: `http://localhost:5000/images/users/${user.image}`
						}
						alt={user.name}
					/>
				)}
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
