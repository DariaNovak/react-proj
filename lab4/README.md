# Lab 4 - Todo List

React Todo app with local task management.

## Component Tree

```
App
└── TodoList
    ├── Input + Add Button
    └── TodoItem[] (map)
        ├── Checkbox
        ├── Text
        └── Delete Button
```

## Data Flow

```
┌─────────────────┐
│   TodoList      │
│  useTodos() ────┼──> State: todos[], isLoading, error
│                 │
│  addTodo() ─────┼──> Adds locally (isLocal: true)
│  deleteTodo() ──┼──> Deletes locally / API
│  toggleTodo() ──┼──> Toggle locally
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  todoService    │──> API: GET /todos, DELETE /todos/:id
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  axiosConfig    │──> baseURL: dummyjson.com
└─────────────────┘
```

### Flow Steps

1. **Load**: `fetchTodos()` → API → `setTodos(data)`
2. **Add**: `addTodo(text)` → local state (no API)
3. **Toggle**: `toggleTodo(id)` → local state update
4. **Delete**: `deleteTodo(id)` → local if `isLocal`, else API call
