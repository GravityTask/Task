import { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import Filter from "./Filter";
import "bootstrap/dist/css/bootstrap.min.css";

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");
    const [filteredTodo, setFilteredTodo] = useState(null);
    const [todoId, setTodoId] = useState("");

    // Load todos from localStorage when the component mounts
    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    // Save todos to localStorage whenever the todos array changes
    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }, [todos]);

    const addTask = async (task) => {
        try {
            const response = await fetch("https://dummyjson.com/todos/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ todo: task, completed: false, userId: 1 }),
            });
            const newTodo = await response.json();
            setTodos([...todos, newTodo]);
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const fetchTodoById = async () => {
        if (!todoId) return;
        try {
            const response = await fetch(`https://dummyjson.com/todos/${todoId}`);
            const data = await response.json();
            setFilteredTodo(data);
        } catch (error) {
            console.error("Error fetching todo by ID:", error);
        }
    };

    const markCompleted = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: true } : todo
            )
        );
    };

    const deleteTask = async (id) => {
        try {
            await fetch(`https://dummyjson.com/todos/${id}`, {
                method: "DELETE",
            });
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === "completed") return todo.completed;
        if (filter === "pending") return !todo.completed;
        return true;
    });

    return (
        <div className="container mt-4">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white text-center">
                    <h2>Todo List</h2>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-3">
                    <AddTodo addTask={addTask} />
                </div>
                <div className="card-body">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
                        <Filter
                            filter={filter}
                            setFilter={setFilter}
                            fetchTodoById={fetchTodoById}
                            setTodoId={setTodoId}
                        />
                        <div className="input-group w-50 w-md-50 mt-3 mt-md-0">
                            <input
                                type="text"
                                className="form-control border-0 border-bottom"
                                placeholder="Enter Todo ID"
                                value={todoId}
                                onChange={(e) => setTodoId(e.target.value)}
                            />
                            <button className="btn btn-success ms-2" onClick={fetchTodoById}>
                                Fetch Todo
                            </button>
                        </div>
                    </div>

                    {filteredTodo && (
                        <div className="alert alert-info">
                            <h4>Filtered Todo</h4>
                            <p>{filteredTodo.todo}</p>
                        </div>
                    )}

                    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                        <table className="table table-striped table-hover">
                            <thead className="table-dark" style={{ position: "sticky", top: "0", zIndex: "2" }}>
                                <tr>
                                    <th>#</th>
                                    <th>Todo</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTodos.map((todo, index) => (
                                    <tr key={todo.id}>
                                        <td>{index + 1}</td>
                                        <td>{todo.todo}</td>
                                        <td>
                                            <span
                                                className={`badge ${todo.completed ? "bg-success" : "bg-warning"}`}
                                            >
                                                {todo.completed ? "Completed" : "Pending"}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-primary me-2"
                                                onClick={() => markCompleted(todo.id)} 
                                            >
                                                Mark Completed
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => deleteTask(todo.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoApp;








