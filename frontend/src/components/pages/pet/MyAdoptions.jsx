/* styles */
import styles from './Dashboard.module.css';

/* hooks */
import { useEffect, useState } from 'react';

/* components */
import RoundedImage from '../../layouts/RoundedImage';

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
				setPets(response.data.pets);
			});
	}, [token]);

	return (
		<section>
			{pets.length > 0 ? (
				<>
					<div className={styles.petslist_header}>
						<h1>Minhas Adoções</h1>
					</div>
					<div className={styles.petslist_container}>
						{pets.map((pet) => (
							<div key={pet._id} className={styles.petlist_row}>
								<RoundedImage
									src={`${import.meta.env.VITE_REACT_APP_API}/images/pets/${
										pet.images[0]
									}`}
									alt={pet.name}
									width='px75'
								/>
								<span className='bold'>{pet.name}</span>
								<p>
									Entre em contato com
									<span className='bold'> {pet.user.name} </span>
									<br></br>
									pelo telefone:<span className='bold'> {pet.user.phone} </span>
									para combinar a visita.
								</p>
								<div className={styles.actions}>
									{pet.available ? (
										<p>Adoção em andamento.</p>
									) : (
										<p>Parabéns, você adotou esse pet.</p>
									)}
								</div>
							</div>
						))}
					</div>
				</>
			) : (
				<p>Você ainda não solicitou nenhuma visita.</p>
			)}
		</section>
	);
}

export default MyAdoptions;
