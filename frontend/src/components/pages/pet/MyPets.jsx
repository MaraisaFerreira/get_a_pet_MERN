import { Link } from 'react-router-dom';

/* hooks */
import { useState } from 'react';

function MyPets() {
	const [pets, setPets] = useState([]);

	return (
		<section>
			<div>
				<h1>My Pets</h1>
				<Link to='/pets/add'>Cadastrar Pet</Link>
			</div>
			<div>
				{pets.length > 0 ? (
					<p>Meus Pets Cadastrados</p>
				) : (
					<p>Você ainda não cadastrou nenhum pet.</p>
				)}
			</div>
		</section>
	);
}

export default MyPets;
