const TodoItem = ({ todo, toggleComplete, deleteTask }) => (
    <li>
      <span
        onClick={() => toggleComplete(todo.id)}
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.todo}
      </span>
      <button onClick={() => deleteTask(todo.id)}>Delete</button>
    </li>
  );
  export default TodoItem;
