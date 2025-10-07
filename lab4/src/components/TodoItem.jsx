import { useState } from 'react';

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.todo || '');

  const startEdit = () => {
    setEditText(todo.todo || '');
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditText(todo.todo || '');
  };

  const saveEdit = () => {
    const trimmed = (editText || '').trim();
    if (!trimmed) return;
    onEdit && onEdit(todo.id, trimmed);
    setIsEditing(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') cancelEdit();
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={!!todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      {!isEditing ? (
        <>
          <span className={`todo-text${todo.completed ? ' completed' : ''}`}>
            {todo.todo}
          </span>
          <button onClick={startEdit}>Edit</button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={onKeyDown}
            autoFocus
          />
          <button onClick={saveEdit}>Save</button>
          <button onClick={cancelEdit}>Cancel</button>
        </>
      )}

      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </div>
  );
};
