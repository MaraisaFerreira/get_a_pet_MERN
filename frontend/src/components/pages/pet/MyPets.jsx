import { Link } from 'react-router-dom';

import api from '../../../utils/api';

/* hooks */
import { useEffect, useState } from 'react';

function MyPets() {
	const [pets, setPets] = useState([]);
	const [token] = useState(localStorage.getItem('token') || '');

	useEffect(() => {
		api
			.get('/pets/mypets', {
				headers: { Authorization: `Bearer ${JSON.parse(token)}` },
			})
			.then((response) => {
				setPets(response.data.pets);
			});
	}, [token]);

	return (
		<section>
			<div>
				<h1>My Pets</h1>
				<Link to='/pets/add'>Cadastrar Pet</Link>
			</div>
			<div>
				{pets.length > 0 ? (
					<p>Meus Pets Cadastrados</p>
				) : (
					<p>Você ainda não cadastrou nenhum pet.</p>
				)}
			</div>
		</section>
	);
}

export default MyPets;
