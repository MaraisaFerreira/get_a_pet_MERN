import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../utils/api';

/* style */
import style from './Home.module.css';

function Home() {
	const [pets, setPets] = useState({});

	useEffect(() => {
		api.get('/pets').then((response) => {
			setPets(response.data.pets);
		});
	}, []);

	async function sortBy(e) {
		const type = e.target.innerText;

		if (type !== 'Todos') {
			api
				.get(`/pets/all/${type}`)
				.then((response) => {
					setPets(response.data.pets);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			api
				.get(`/pets`)
				.then((response) => {
					setPets(response.data.pets);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}

	return (
		<section>
			<div className={style.home_header}>
				<div>
					<h1>Adote um pet</h1>
					<p>Clique em saiba mais para ver mais detalhes do pet.</p>
				</div>
				<div>
					<p>
						Buscar por:
						<button onClick={sortBy}>Gatos</button>
						<button onClick={sortBy}>Cachorros</button>
						<button onClick={sortBy}>Coelhos</button>
						<button onClick={sortBy}>Ramsters</button>
						<button onClick={sortBy}>Todos</button>
					</p>
				</div>
			</div>
			<div className={style.pet_container}>
				{pets.length > 0 ? (
					pets.map((pet) => (
						<div key={pet._id} className={style.pet_card}>
							<div
								style={{
									backgroundImage: `url(${
										import.meta.env.VITE_REACT_APP_API
									}/images/pets/${pet.images[0]}`,
								}}
								className={style.pet_card_image}
							></div>
							<h3>{pet.name}</h3>
							<p>
								<span className='bold'>Idade: </span>
								{pet.age} ano(s)
							</p>
							{pet.available ? (
								pet.adopter ? (
									<Link className={style.reserved} to={`/pets/${pet._id}`}>
										Adoção em análise
									</Link>
								) : (
									<Link to={`/pets/${pet._id}`}>Saiba mais</Link>
								)
							) : (
								<p className={style.adopted_text}>Já Adotado.</p>
							)}
						</div>
					))
				) : (
					<p>Não há pets disponíveis para adoção no momento.</p>
				)}
			</div>
		</section>
	);
}

export default Home;
