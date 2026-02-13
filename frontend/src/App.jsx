import { useState } from "react"

export default function App() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    await fetch('/api/todos', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: inputValue }),
    });
    setInputValue("");
  }

  return (
    <>
      <div id="heading">Yet another Todo app!!</div>
      <div id="input-container">
        <form onSubmit={handleSubmit}>
          <label>
            Add todo
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
          />
          <button type="submit">add</button>
        </form>
      </div >
    </>
  )
}

