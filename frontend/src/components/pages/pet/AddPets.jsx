import styles from './AddPets.module.css';

/* components */
import PetForm from '../../form/PetForm';

function AddPets() {
	return (
		<section className={styles.addpet_header}>
			<div>
				<h1>Cadastre um pet</h1>
				<p>Depois de cadastrado ele ficará disponível para adoção.</p>
			</div>
			<PetForm textSubmit='Cadastrar Pet' />
		</section>
	);
}

export default AddPets;
