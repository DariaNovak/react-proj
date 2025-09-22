import  { useState } from 'react';
import styles from './ToDoItem.module.css';

export default function ToDoItem({ id, text, onDelete }) {
  const [completed, setCompleted] = useState(false);

  return (
    <li className={styles.todo}>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => setCompleted(!completed)}
        />
        <span className={completed ? styles.completed : ''}>{text}</span>
      </label>
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
}
