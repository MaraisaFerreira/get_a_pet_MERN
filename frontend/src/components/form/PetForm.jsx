import formStyles from './Form.module.css';

/* components */
import Input from '../form/Input';
import InputSelect from './InputSelect';

/* hooks */
import { useState } from 'react';

function PetForm({ petData, textSubmit, handleSubmit }) {
	const [pet, setPet] = useState(petData || { ageType: 'ano' });
	const [preview, setPreview] = useState([]);

	const colors = [
		'branco',
		'preto',
		'amarelo',
		'tricolor',
		'cinza',
		'branco e preto',
		'mesclado',
	];

	const petType = ['gato', 'cachorro', 'coelho', 'hamster'];

	function handleOnChange(e) {
		setPet({ ...pet, [e.target.name]: e.target.value });
	}

	function handleFileChange(e) {
		setPreview(Array.from(e.target.files));
		setPet({ ...pet, [e.target.name]: [...e.target.files] });
	}

	function handleColorChange(e) {
		setPet({
			...pet,
			[e.target.name]: e.target.options[e.target.selectedIndex].text,
		});
	}

	function handleTypeChange(e) {
		setPet({
			...pet,
			[e.target.name]: e.target.options[e.target.selectedIndex].text,
		});
	}

	function handleAgeType(e) {
		setPet({ ...pet, [e.target.name]: e.target.value });
	}

	function submit(e) {
		e.preventDefault();
		handleSubmit(pet);
	}

	return (
		<form onSubmit={submit} className={formStyles.form_container}>
			<div className={formStyles.preview_imgs_pet}>
				{preview.length > 0
					? preview.map((image, index) => (
							<img
								src={URL.createObjectURL(image)}
								alt={pet.name}
								key={`${pet.name}-${index}`}
							/>
					  ))
					: pet.images &&
					  pet.images.map((image, index) => (
							<img
								src={`${
									import.meta.env.VITE_REACT_APP_API
								}/images/pets/${image}`}
								alt={pet.name}
								key={`${pet.name}-${index}`}
							/>
					  ))}
			</div>
			<Input
				text='Nome'
				type='text'
				name='name'
				placeholder='Nome do pet'
				handleOnChange={handleOnChange}
				value={pet.name || ''}
			/>
			<Input
				text='Idade'
				type='number'
				name='age'
				placeholder='Idade do pet'
				handleOnChange={handleOnChange}
				value={pet.age || ''}
			/>
			<div className={formStyles.age_type}>
				<label htmlFor='mes'>
					<input
						type='radio'
						id='mes'
						name='ageType'
						value='mes'
						onChange={handleAgeType}
						checked={pet.ageType === 'mes' || ''}
					/>
					Mês
				</label>
				<label htmlFor='ano'>
					<input
						type='radio'
						id='ano'
						name='ageType'
						value='ano'
						onChange={handleAgeType}
						checked={pet.ageType === 'ano' ? true : pet.ageType !== 'mes'}
					/>
					Ano
				</label>
			</div>
			<Input
				text='Peso'
				type='number'
				name='weight'
				placeholder='Peso do pet'
				handleOnChange={handleOnChange}
				value={pet.weight || ''}
			/>
			<Input
				text='Imagens do pet'
				name='images'
				type='file'
				handleOnChange={handleFileChange}
				multiple={true}
			/>
			<InputSelect
				name='type'
				text='Tipo'
				value={pet.type || ''}
				options={petType}
				handleOnChange={handleTypeChange}
			/>
			<InputSelect
				name='color'
				text='Cor'
				value={pet.color || ''}
				options={colors}
				handleOnChange={handleColorChange}
			/>
			<input type='submit' value={textSubmit} />
		</form>
	);
}

export default PetForm;
