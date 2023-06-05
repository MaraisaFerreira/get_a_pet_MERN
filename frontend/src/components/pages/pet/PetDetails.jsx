/* styles */
import styles from './PetDetails.module.css';

import api from '../../../utils/api';

/* hooks */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFlashMessage from '../../../hooks/useFlashMessage';

function PetDetails() {
	const [pet, setPet] = useState({});
	const { id } = useParams();
	const [token] = useState(localStorage.getItem('token') || '');

	const { setFlashMessage } = useFlashMessage();

	useEffect(() => {
		api.get(`/pets/${id}`).then((response) => {
			setPet(response.data.pet);
		});
	}, [id]);

	async function schedule() {
		let msgType = 'success';

		const data = await api
			.patch(`/pets/schedule/${id}`, {
				Authorization: `Bearer ${JSON.parse(token)}`,
			})
			.then((response) => {
				return response.data;
			})
			.catch((err) => {
				msgType = 'error';
				return err.response.data;
			});

		setFlashMessage(data.message, msgType);
	}

	return (
		<>
			{pet.name && (
				<section className={styles.pet_details_container}>
					<div className={styles.petdetails_header}>
						<h1>{pet.name}</h1>
						<p>Marque uma visita para conhecer o pet. 😊</p>
					</div>
					<div className={styles.pet_images}>
						{pet.images.map((image, idx) => (
							<img
								src={`${
									import.meta.env.VITE_REACT_APP_API
								}/images/pets/${image}`}
								alt={pet.name}
								key={idx}
							/>
						))}
					</div>
					<p>
						<span className='bold'>Idade: </span>
						{pet.age} anos &nbsp;
						<span className='bold'>Peso: </span>
						{pet.weight} kilos
					</p>

					{token ? (
						<button onClick={schedule}>Solicitar visita</button>
					) : (
						<p>
							Para agendar uma visita,
							<Link to='\register'> crie uma conta</Link> ou faça
							<Link to='/login'> login</Link>
						</p>
					)}
				</section>
			)}
		</>
	);
}

export default PetDetails;
