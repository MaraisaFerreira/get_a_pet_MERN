import { Link } from 'react-router-dom';

import api from '../../../utils/api';

/* styles */
import dashStyle from './Dashboard.module.css';

/* components */
import RoundedImage from '../../layouts/RoundedImage';

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
					<>
						<h2>Meus pets cadastrados.</h2>
						{pets.map((pet) => (
							<div key={pet._id}>
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
											<button>Excluir</button>
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
