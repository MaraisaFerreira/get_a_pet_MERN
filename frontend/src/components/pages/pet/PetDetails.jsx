import api from '../../../utils/api';

/* hooks */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFlashMessage from '../../../hooks/useFlashMessage';

function PetDetails() {
	const [pet, setPet] = useState({});
	const { id } = useParams();

	const { setFlashMessage } = useFlashMessage();

	useEffect(() => {
		api.get(`/pets/${id}`).then((response) => {
			setPet(response.data.pet);
		});
	}, [id]);

	return (
		<section>
			<h1>{pet.name}</h1>
		</section>
	);
}

export default PetDetails;
