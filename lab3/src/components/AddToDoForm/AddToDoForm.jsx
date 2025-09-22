import { useState } from 'react';
import styles from './AddToDoForm.module.css';

export default function AddToDoForm({ onAdd }) {
	const [value, setValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault(); //не дає сторінці перезавантажуватися
		if (!value.trim()) return;
		onAdd(value);
		setValue('');
	};

		return (
			<form onSubmit={handleSubmit} className={styles["add-todo"]}>
				<input
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder="Enter task name"
				/>
				<button type="submit">Add</button>
			</form>
		);
}
