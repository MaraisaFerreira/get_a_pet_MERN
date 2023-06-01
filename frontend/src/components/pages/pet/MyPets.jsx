import { Link } from 'react-router-dom';

import api from '../../../utils/api';

/* styles */
import dashStyle from './Dashboard.module.css';

/* components */
import RoundedImage from '../../layouts/RoundedImage';

/* hooks */
import { useEffect, useState } from 'react';
import useFlashMessage from '../../../hooks/useFlashMessage';

function MyPets() {
	const [pets, setPets] = useState([]);
	const [token] = useState(localStorage.getItem('token') || '');
	const { setFlashMessage } = useFlashMessage();

	useEffect(() => {
		api
			.get('/pets/mypets', {
				headers: { Authorization: `Bearer ${JSON.parse(token)}` },
			})
			.then((response) => {
				setPets(response.data.pets);
			});
	}, [token]);

	async function handleDeletePet(id) {
		let msgType = 'success';

		const data = await api
			.delete(`/pets/${id}`, {
				headers: {
					Authorization: `Bearer ${JSON.parse(token)}`,
				},
			})
			.then((response) => {
				const updatedPets = pets.filter((pet) => pet._id != id);
				setPets(updatedPets);
				return response.data;
			})
			.catch((err) => {
				msgType = 'error';
				return err.response.data;
			});

		setFlashMessage(data.message, msgType);
	}

	return (
		<section>
			<div className={dashStyle.petslist_header}>
				<h1>My Pets</h1>
				<Link to='/pets/add'>Cadastrar Pet</Link>
			</div>
			<div className={dashStyle.pet_container}>
				{pets.length > 0 ? (
					<>
						<h2>Meus pets cadastrados.</h2>
						{pets.map((pet) => (
							<div key={pet._id} className={dashStyle.petlist_row}>
								<RoundedImage
									src={`${import.meta.env.VITE_REACT_APP_API}/images/pets/${
										pet.images[0]
									}`}
									alt={pet.name}
									width='px75'
								/>
								<span className='bold'>{pet.name}</span>
								<div className={dashStyle.actions}>
									{pet.available ? (
										<>
											{pet.adopter && <button>Concluir adoção</button>}
											<Link to={`/pets/edit/${pet._id}`}>Editar</Link>
											<button onClick={() => handleDeletePet(pet._id)}>
												Excluir
											</button>
										</>
									) : (
										<p>Pet já adotado.</p>
									)}
								</div>
							</div>
						))}
					</>
				) : (
					<p>Você ainda não cadastrou nenhum pet.</p>
				)}
			</div>
		</section>
	);
}

export default MyPets;
