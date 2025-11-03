import { useState, useEffect, useMemo, useCallback } from 'react';
import { todoService } from '../services/todoService';

export const useTodos = () => {
  const [pageTodos, setPageTodos] = useState([]);
  const [todos, setTodos] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [totalTodos, setTotalTodos] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');

  const skip = useMemo(
    () => (currentPage - 1) * limitPerPage,
    [currentPage, limitPerPage]
  );

  const fetchTodos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await todoService.getTodo({ limit: limitPerPage, skip });

      const fetched = Array.isArray(data.todos) ? data.todos : [];
      setPageTodos(fetched);
      setTotalTodos(
        typeof data.total === 'number' ? data.total : fetched.length
      );
    } catch (err) {
      setError(err.message || 'Loading error!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!searchTerm) {
      setTodos(pageTodos);
      return;
    }
    const term = searchTerm.toLowerCase();
    const filtered = pageTodos.filter((t) => {
      const text = String(t.todo || t.title || '').toLowerCase();
      return text.includes(term);
    });
    setTodos(filtered);
  }, [pageTodos, searchTerm]);

  const totalPages = useMemo(
    () => Math.ceil(totalTodos / limitPerPage) || 1,
    [totalTodos, limitPerPage]
  );

  const goToNextPage = () => {
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((p) => Math.max(p - 1, 1));
  };

  const setLimit = (limit) => {
    setLimitPerPage(Number(limit) || 1);
    setCurrentPage(1);
  };

  const editTodoTitle = useCallback(async (id, newTitle) => {
    const local = pageTodos.find((t) => t.id === id);
    if (local && local.isLocal) {
      const updated = pageTodos.map((t) =>
        t.id === id ? { ...t, todo: newTitle } : t
      );
      setPageTodos(updated);
      return;
    }

    try {
      setIsLoading(true);
      const updatedRemote = await todoService.updateTodo(id, {
        todo: newTitle,
      });
      const updatedPage = pageTodos.map((t) =>
        t.id === id ? { ...t, ...updatedRemote } : t
      );
      setPageTodos(updatedPage);
    } catch (err) {
      setError(err.message || 'Update failed');
    } finally {
      setIsLoading(false);
    }
  }, [pageTodos]); 

  const deleteTodo = useCallback(async (id) => {
    const todo = pageTodos.find((t) => t.id === id);
    if (todo && todo.isLocal) {
      setPageTodos(pageTodos.filter((t) => t.id !== id));
      return;
    }
    try {
      await todoService.deleteTodo(id);
      setPageTodos(pageTodos.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }, [pageTodos]);


  const addTodo = useCallback((todoText) => {
    const newTodo = {
      id: Date.now(),
      todo: todoText,
      completed: false,
      userId: 1,
      isLocal: true,
    };
    setPageTodos((prev) => [newTodo, ...prev]);
  }, []);

  const toggleTodo = useCallback((id) => {
    const todo = pageTodos.find((t) => t.id === id);
    if (todo && todo.isLocal) {
      setPageTodos(
        pageTodos.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      );
      return;
    }
    setPageTodos(
      pageTodos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }, [pageTodos]);

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, limitPerPage]);

  return {
    todos,
    isLoading,
    error,
    addTodo,
    deleteTodo,
    toggleTodo,
    // pagination state and controls
    currentPage,
    limitPerPage,
    totalTodos,
    totalPages,
    goToNextPage,
    goToPrevPage,
    setLimit,
    // search
    searchTerm,
    setSearchTerm,
    // edit
    editTodoTitle,
  };
};