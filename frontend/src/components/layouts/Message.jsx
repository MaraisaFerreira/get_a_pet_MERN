import { useEffect, useState } from 'react';

import style from './Message.module.css';

import bus from '../../utils/bus';

function Message() {
	const [visibility, setVisibility] = useState(false);
	const [type, setType] = useState('');
	const [message, setMessage] = useState('');

	useEffect(() => {
		bus.addListener('flash', ({ message, type }) => {
			setVisibility(true);
			setMessage(message);
			setType(type);

			setTimeout(() => {
				setVisibility(false);
			}, 3000);
		});
	}, []);

	return (
		visibility && (
			<div className={`${style.message} ${style[type]}`}>{message}</div>
		)
	);
}

export default Message;
