import api from '../utils/api';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useFlashMessage from './useFlashMessage';

export default function useAuth() {
	const { setFlashMessage } = useFlashMessage();

	const [authenticated, setAuthenticated] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token) {
			api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
			setAuthenticated(true);
		}
	}, []);

	async function register(user) {
		let msgTxt = 'Cadastro realizado com sucesso!';
		let type = 'success';

		try {
			const data = await api.post('/users/register', user).then((response) => {
				return response.data;
			});
			await authUser(data);
		} catch (err) {
			msgTxt = err.response.data.message;
			type = 'error';
		}

		setFlashMessage(msgTxt, type);
	}

	async function authUser(data) {
		setAuthenticated(true);
		localStorage.setItem('token', JSON.stringify(data.token));
		navigate('/');
	}

	return { authenticated, register };
}
