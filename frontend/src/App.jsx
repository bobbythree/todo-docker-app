import { useState, useEffect } from "react";
import { getTodos, createTodo } from "./api/todos";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      const data = await getTodos();
      setTodos(data);
    };

    loadTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    await createTodo(inputValue);
    setInputValue("");

    const updated = await getTodos();
    setTodos(updated);
  };

  return (
    <>
      <div id="heading">Yet another Todo app!!</div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
}

