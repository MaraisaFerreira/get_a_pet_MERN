import style from './Input.module.css';

function Input({
	type,
	text,
	name,
	placeholder,
	value,
	handleOnChange,
	multiple,
}) {
	return (
		<div className={style.form_control}>
			<label htmlFor={name}>{text}</label>
			<input
				type={type}
				placeholder={placeholder}
				name={name}
				id={name}
				value={value}
				onChange={handleOnChange}
				{...(multiple ? { multiple } : '')}
			/>
		</div>
	);
}

export default Input;
