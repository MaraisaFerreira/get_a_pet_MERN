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

	return (
		<section>
			<div className={style.home_header}>
				<h1>Adote um pet</h1>
				<p>Clique em saiba mais para ver mais detalhes do pet.</p>
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
								{pet.age}
							</p>
							{pet.available ? (
								<Link to={`/pets/${pet._id}`}>Saiba mais</Link>
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
