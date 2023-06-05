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

	return (
		<>
			{pet.name && (
				<section>
					<div>
						<h1>{pet.name}</h1>
						<p>Marque uma visita para conhecer o pet. 😊</p>
					</div>
					{pet.images.map((image, idx) => (
						<img
							src={`${import.meta.env.VITE_REACT_APP_API}/images/pets/${image}`}
							alt={pet.name}
							key={idx}
						/>
					))}
					<p>
						<span className='bold'>Idade:</span>
						{pet.age} anos
					</p>
					<p>
						<span className='bold'>Peso:</span>
						{pet.weight} kilos
					</p>
					{token ? (
						<button>Solicitar visita</button>
					) : (
						<p>
							Crie uma conta <Link to='\register'>aqui</Link> ou faça
							<Link to='/login'>login</Link>
						</p>
					)}
				</section>
			)}
		</>
	);
}

export default PetDetails;
