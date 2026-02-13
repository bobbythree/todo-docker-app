import { useState, useEffect } from "react";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    if (!res.ok) return;
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    const loadTodos = async () => {
      await fetchTodos();
    };

    loadTodos();
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: inputValue }),
    });

    setInputValue("");
    await fetchTodos();
  };

  return (
    <>
      <div id="heading">Yet another Todo app!!</div>

      <div id="input-container">
        <form onSubmit={handleSubmit}>
          <label>Add todo</label>

          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
          />

          <button type="submit">add</button>
        </form>
      </div>

      <div id="todo-list">
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

