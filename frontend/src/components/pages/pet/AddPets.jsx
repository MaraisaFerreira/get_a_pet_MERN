import styles from './AddPets.module.css';

import api from '../../../utils/api';

/* hooks */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFlashMessage from '../../../hooks/useFlashMessage';

/* components */
import PetForm from '../../form/PetForm';

function AddPets() {
	const [token] = useState(localStorage.getItem('token') || '');
	const { setFlashMessage } = useFlashMessage();
	const navigate = useNavigate();

	async function registerPet(pet) {
		let msgType = 'success';

		const formData = new FormData();

		const petFormData = await Object.keys(pet).forEach((key) => {
			if (key === 'images') {
				for (const value of pet[key]) {
					formData.append(key, value);
				}
			} else {
				formData.append(key, pet[key]);
			}
		});

		formData.append('pet', petFormData);

		const data = await api
			.post(`pets/create`, formData, {
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
		if (msgType !== 'error') {
			navigate('/pets/mypets');
		}
	}

	return (
		<section className={styles.addpet_header}>
			<div>
				<h1>Cadastre um pet</h1>
				<p>Depois de cadastrado ele ficará disponível para adoção.</p>
			</div>
			<PetForm handleSubmit={registerPet} textSubmit='Cadastrar Pet' />
		</section>
	);
}

export default AddPets;
