/* hooks */
import { useEffect, useState } from 'react';

import api from '../../../utils/api';

function MyAdoptions() {
	const [pets, setPets] = useState([]);
	const [token] = useState(localStorage.getItem('token') || '');

	useEffect(() => {
		api
			.get('/pets/myadoptions', {
				headers: {
					Authorization: `Bearer ${JSON.parse(token)}`,
				},
			})
			.then((response) => {
				console.log(response.data);
			});
	}, [token]);

	return (
		<section>
			<h1>Minhas Adoções</h1>
		</section>
	);
}

export default MyAdoptions;
