/* styles */
import styles from './AddPets.module.css';

/* hooks */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFlashMessage from '../../../hooks/useFlashMessage';

/* components */
import PetForm from '../../form/PetForm';

import api from '../../../utils/api';

function EditPet() {
	const { id } = useParams();
	const [pet, setPet] = useState({});
	const [token] = useState(localStorage.getItem('token') || '');
	const { setFlashMessage } = useFlashMessage();
	const navigate = useNavigate();

	useEffect(() => {
		api
			.get(`/pets/${id}`, {
				headers: {
					Authorization: `Bearer ${JSON.parse(token)}`,
				},
			})
			.then((response) => {
				setPet(response.data.pet);
			})
			.catch((err) => {
				return err.response.data;
			});
	}, [token, id]);

	async function updatePet(pet) {
		let msgType = 'success';

		const formData = new FormData();

		const petFormData = await Object.keys(pet).forEach((key) => {
			if (key === 'images') {
				pet[key].forEach((image) => {
					formData.append('images', image);
				});
			} else {
				formData.append(key, pet[key]);
			}
		});

		formData.append('pet', petFormData);

		const data = await api
			.patch(`pets/${pet._id}`, formData, {
				headers: {
					Authorization: `Bearer ${JSON.parse(token)}`,
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((response) => {
				console.log(response.data);
				return response.data;
			})
			.catch((err) => {
				console.log(err);
				msgType = 'error';
				return err.response.data;
			});

		setFlashMessage(data.message, msgType);
		navigate('/pets/mypets');
	}

	return (
		<section>
			<div className={styles.addpet_header}>
				<h1>Editando {pet?.name}</h1>
				<p>Depois de salvar os dados serão alterados no sistema.</p>
			</div>
			{pet.name && (
				<PetForm
					handleSubmit={updatePet}
					textSubmit='Atualizar'
					petData={pet}
				/>
			)}
		</section>
	);
}

export default EditPet;
