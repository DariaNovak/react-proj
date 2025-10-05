import { useState, useEffect } from 'react';
import { todoService } from '../services/todoService';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await todoService.getTodo();
      setTodos(data);
    } catch (err) {
      setError(err.message || 'Loading error!');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (todo && todo.isLocal) {
      setTodos(todos.filter((t) => t.id !== id));
      return;
    }
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const addTodo = (todoText) => {
    const newTodo = {
      id: Date.now(),
      todo: todoText,
      completed: false,
      userId: 1,
      isLocal: true,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id) => {
    const todo = todos.find((t) => t.id === id);
    if (todo && todo.isLocal) {
      setTodos(
        todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
      return;
    }
    // Для серверних задач можна залишити API запит (необов'язково)
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    isLoading,
    error,
    addTodo,
    deleteTodo,
    toggleTodo,
  };
};
