import {useState} from "react";
import styles from './ToDoList.module.css';
import AddToDoForm from "../AddToDoForm/AddToDoForm";
import ToDoItem from "../ToDoItem/ToDoItem";

export default function ToDoList(){
	const [toDos, setToDos] = useState([]);

	const addTask = (text) => {
		setToDos([...toDos, {id: crypto.randomUUID(), text}])
	};

	const deleteToDo = (id) => {
		setToDos(toDos.filter((todo) => todo.id !== id));
	}

   return (
		<section className={styles.section}>
			<AddToDoForm onAdd={addTask} />
			{toDos.length == 0 ? (
				<p className={styles.empty}>There is no tasks!</p>
			) : (
				<ul className={styles["todo-list"]}>
					{toDos.map((todo) => (
						<ToDoItem
						key={todo.id}
						id={todo.id}
						text={todo.text}
						onDelete={deleteToDo}
						/>
					))}
				</ul>
			)}
		</section>
	);

}

