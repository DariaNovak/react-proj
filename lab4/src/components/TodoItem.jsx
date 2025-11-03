import { useState, memo, useCallback } from 'react';

export const TodoItem = memo(({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.todo || '');

  const startEdit = useCallback(() => {
    setEditText(todo.todo || '');
    setIsEditing(true);
  }, [todo.todo]);

  const cancelEdit = useCallback(() => {
    setIsEditing(false);
    setEditText(todo.todo || '');
  }, [todo.todo]);

  const saveEdit = useCallback(() => {
    const trimmed = (editText || '').trim();
    if (!trimmed) return;
    onEdit && onEdit(todo.id, trimmed);
    setIsEditing(false);
  }, [editText, onEdit, todo.id]);

  const onKeyDown = useCallback((e) => {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') cancelEdit();
  }, [saveEdit, cancelEdit]);

  const handleToggle = useCallback(() =>{
    onToggle(todo.id);
  }, [onToggle, todo.id]);

  const handleDelete = useCallback(() =>{
    onDelete(todo.id);
  }, [onDelete, todo.id]);

  const handleTextChange = useCallback((e) =>{
    setEditText(e.target.value);
  }, []);

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={!!todo.completed}
        onChange={handleToggle}
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
            onChange={handleTextChange}
            onKeyDown={onKeyDown}
            autoFocus
          />
          <button onClick={saveEdit}>Save</button>
          <button onClick={cancelEdit}>Cancel</button>
        </>
      )}

      <button className="delete-btn" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
});
