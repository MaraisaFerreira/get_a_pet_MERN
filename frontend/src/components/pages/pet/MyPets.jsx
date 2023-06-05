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
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		api
			.get('/pets/mypets', {
				headers: { Authorization: `Bearer ${JSON.parse(token)}` },
			})
			.then((response) => {
				setPets(response.data.pets);
			});
	}, [token, update]);

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

	async function concludeAdoption(petId) {
		let msgType = 'success';

		const data = await api
			.patch(`/pets/complete/${petId}`, {
				headers: {
					Authorization: `Bearer ${JSON.parse(token)}`,
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
		setUpdate((prevState) => !prevState);
	}

	async function refuseAdoption(petId) {
		let msgType = 'success';

		const data = await api
			.patch(`/pets/refuse/${petId}`, {
				headers: {
					Authorization: `Bearer ${JSON.parse(token)}`,
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
		setUpdate((prevState) => !prevState);
	}

	return (
		<section>
			<div className={dashStyle.petslist_header}>
				<h1>Meus pets cadastrados.</h1>
				<Link to='/pets/add'>Cadastrar Pet</Link>
			</div>
			<div className={dashStyle.pet_container}>
				{pets.length > 0 ? (
					<>
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
								{pet.adopter && pet.available && (
									<p>
										Visita solicitada por:
										<span className='bold'> {pet.adopter.name} </span>
										<br></br>
										Telefone:
										<span className='bold'> {pet.adopter.phone} </span>
									</p>
								)}
								{pet.adopter && !pet.available && (
									<p>
										Adotado por:
										<span className='bold'> {pet.adopter.name} </span>
										<br></br>
										Telefone:
										<span className='bold'> {pet.adopter.phone} </span>
									</p>
								)}
								<div className={dashStyle.actions}>
									{pet.available ? (
										<>
											{pet.adopter && (
												<>
													<button
														className={dashStyle.conclude_btn}
														onClick={() => concludeAdoption(pet._id)}
													>
														Concluir adoção
													</button>
													<button
														className={dashStyle.refuse_btn}
														onClick={() => refuseAdoption(pet._id)}
													>
														Recusar adoção
													</button>
												</>
											)}
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
