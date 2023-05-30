import styles from './InputSelect.module.css';

function InputSelect({ name, text, value, handleOnChange, options }) {
	return (
		<div className={styles.form_control}>
			<label htmlFor={name}>{text}</label>
			<select
				name={name}
				onChange={handleOnChange}
				id={name}
				value={value || ''}
			>
				<option>Selecione uma opção</option>
				{options.map((option) => (
					<option value={option} key={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
}

export default InputSelect;
