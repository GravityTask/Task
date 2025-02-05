import { useState } from "react";


const AddTodo = ({ addTask }) => {
    const [task, setTask] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (task.trim()) {
        addTask(task);
        setTask("");
      }
    };
  
    return (
        <form onSubmit={handleSubmit} className="d-flex align-items-center mb-3">
        <input
          type="text"
          className="form-control border-0 border-bottom me-2"
          placeholder="Add a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">Add</button>
      </form>
      
    );
  };
  export default AddTodo;
