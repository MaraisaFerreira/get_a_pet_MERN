import api from '../utils/api';

export default function useAuth() {
	async function register(user) {
		try {
			const data = await api
				.post('/user/register', user)
				.then((response) => response.data);

			console.log(data);
		} catch (err) {
			console.log(err);
		}
	}

	return { register };
}
