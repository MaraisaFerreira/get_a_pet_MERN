import api from '../utils/api';

import useFlashMessage from './useFlashMessage';

export default function useAuth() {
	const { setFlashMessage } = useFlashMessage();

	async function register(user) {
		let msgTxt = 'Cadastro realizado com sucesso!';
		let type = 'success';

		try {
			const data = await api.post('/users/register', user).then((response) => {
				return response.data;
			});
		} catch (err) {
			msgTxt = err.response.data.message;
			type = 'error';
		}

		setFlashMessage(msgTxt, type);
	}

	return { register };
}
