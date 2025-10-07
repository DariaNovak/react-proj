import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { TodoItem } from './TodoItem';
import './TodoList.css';

export const TodoList = () => {
  const {
    todos,
    isLoading,
    error,
    deleteTodo,
    addTodo,
    toggleTodo,
    editTodoTitle,
    searchTerm,
    setSearchTerm,
    currentPage,
    limitPerPage,
    totalTodos,
    totalPages,
    goToNextPage,
    goToPrevPage,
    setLimit,
  } = useTodos();

  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = () => {
    if (newTodoText.trim() === '') return;
    addTodo(newTodoText);
    setNewTodoText('');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Todo List</h1>

      <div className="todo-controls">
        <input
          className="todo-search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search todos..."
        />
        <select value={limitPerPage} onChange={(e) => setLimit(e.target.value)}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      <div className="todo-add">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Enter new todo"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <div className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={(id, newTitle) => editTodoTitle(id, newTitle)}
          />
        ))}
      </div>

      <div className="pagination">
        <button onClick={goToPrevPage} disabled={currentPage <= 1}>
          Previous
        </button>
        <div className="page-info">
          Page {currentPage} of {totalPages}
          <div className="total-items">Total items: {totalTodos}</div>
        </div>
        <button onClick={goToNextPage} disabled={currentPage >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};
