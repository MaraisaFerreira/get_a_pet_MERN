/* styles */
import styles from './AddPets.module.css';

/* hooks */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/* components */
import PetForm from '../../form/PetForm';

import api from '../../../utils/api';

function EditPet() {
	const { id } = useParams();
	const [pet, setPet] = useState({});
	const [token] = useState(localStorage.getItem('token') || '');

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

	async function updatePet(e) {}

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
