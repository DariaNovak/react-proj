# Lab 4,5,6 - Todo List with Pagination & Search

## Architecture & Data Flow

```
                           App.jsx
                       (Composition Root)
                        No state here
                              |
                              | renders
                              ↓
                        TodoList.jsx
                     (Container Component)
                              |
                       useTodos() hook
                              |
           ┌──────────────────┼──────────────────┐
           |                  |                  |
           ↓                  ↓                  ↓
    State Management     todoService      Render Children
           |                  |                  |
           |                  ↓                  |
           |           axiosConfig               |
           |          (Axios Instance)           |
           |                  |                  |
           |                  ↓                  |
           |          DummyJSON REST API         |
           |                  |                  |
           |    ┌─────────────┴─────────────┐   |
           |    |                           |   |
           |    ↓                           ↓   |
           | GET /todos                 PUT /todos/{id}
           | ?limit={n}&skip={m}        DELETE /todos/{id}
           |    |                           |
           |    └───────────┬───────────────┘
           |                ↓
           |         Response: { todos[], total, skip, limit }
           |                |
           ↓                ↓
    ┌─────────────────────────────────┐
    │   useTodos Hook State           │
    ├─────────────────────────────────┤
    │ pageTodos: Todo[]    ← API data │
    │ todos: Todo[]        ← filtered │
    │ searchTerm: string              │
    │ currentPage: number             │
    │ limitPerPage: number            │
    │ totalTodos: number              │
    │ isLoading: boolean              │
    │ error: string | null            │
    └─────────────────────────────────┘
           |
           | exposes functions & state
           ↓
    ┌─────────────────────────────────┐
    │  TodoList Component Receives:   │
    ├─────────────────────────────────┤
    │ • todos (filtered)              │
    │ • searchTerm, setSearchTerm     │
    │ • currentPage, totalPages       │
    │ • limitPerPage, setLimit        │
    │ • goToNextPage, goToPrevPage    │
    │ • addTodo, deleteTodo           │
    │ • toggleTodo, editTodoTitle     │
    │ • isLoading, error              │
    └─────────────────────────────────┘
           |
           | maps over todos
           ↓
    ┌─────────────────────────────────┐
    │  TodoItem.jsx (Presentational)  │
    │         (multiple instances)    │
    ├─────────────────────────────────┤
    │ Props received:                 │
    │  • todo: { id, todo, completed }│
    │  • onToggle(id)                 │
    │  • onDelete(id)                 │
    │  • onEdit(id, newTitle)         │
    ├─────────────────────────────────┤
    │ Internal State:                 │
    │  • isEditing: boolean           │
    │  • editText: string             │
    ├─────────────────────────────────┤
    │ Renders:                        │
    │  • Checkbox → onToggle          │
    │  • Text / Input → edit mode     │
    │  • Edit/Save/Cancel buttons     │
    │  • Delete button → onDelete     │
    └─────────────────────────────────┘

```

## PATTERNS

 Custom Hooks — винесення логіки у useTodos для переиспользування
 Container/Presentational — TodoList керує даними, TodoItem відображає UI
 Service Layer — todoService централізує всі API виклики
 Observer — useEffect реагує на зміни стану (pagination, search)
 Strategy — різна логіка для локальних та серверних todos