## Data Flow
- ToDoList holds the state of the tasks (toDos) using useState.
- AddToDoForm receives the addTask function via the onAdd prop and calls it on form submit.
- ToDoList passes the deleteToDo function to each ToDoItem via the onDelete prop.
- ToDoItem receives task data and the onDelete function via props and calls onDelete(id) when the Delete button is clicked.

All state is managed in ToDoList. Child components only trigger state changes via props.

## Data Flow Diagram

```
App
└── ToDoList (state: toDos)
    ├── AddToDoForm
    │     └── props: onAdd (function)
    └── ToDoItem (for each todo)
          └── props: id, text, onDelete (function)

[State: toDos] is stored in ToDoList.
[AddToDoForm] calls onAdd (from props) → updates toDos in ToDoList.
[ToDoList] maps toDos and passes each todo's data + onDelete to [ToDoItem].
[ToDoItem] calls onDelete(id) (from props) → updates toDos in ToDoList.
```

- **State**: Only ToDoList holds the state (toDos array).
- **Props**: Functions and data are passed down as props.
- **Upward Data Flow**: AddToDoForm and ToDoItem trigger changes by calling functions from props, which update the state in ToDoList.
- **Downward Data Flow**: ToDoList passes data and handlers to children via props.