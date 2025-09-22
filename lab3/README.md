## Component Tree

```
App
└── ToDoList
    ├── AddToDoForm
    └── ToDoItem (multiple)
```

## Data Flow

- ToDoList holds the state of the tasks (toDos) using useState.
- AddToDoForm receives the addTask function via the onAdd prop and calls it on form submit.
- ToDoList passes the deleteToDo function to each ToDoItem via the onDelete prop.
- ToDoItem receives task data and the onDelete function via props and calls onDelete(id) when the Delete button is clicked.

All state is managed in ToDoList. Child components only trigger state changes via props.