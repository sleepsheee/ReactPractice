// import { func } from "prop-types";

import { useState } from "react";
import "./styles.css";

//js key word: class, for
//one func can only return 1 element: 1. wrap all things in a div
//2 .use a fragment
function App() {
  const [newItem, setNewItem] = useState(""); //modify a value
  const [toDos, setTodos] = useState([]);
  //prevent the page from refesh when pressing add
  function handleSubmit(e) {
    e.preventDefault();

    setTodos((currentTodos) => {
      //currentTodos is a function
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });
    setNewItem("");
  }
  function switchTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  //handleSubmit, get the cur value and modify it, pass a function
  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)} //listen value change, pass a value
            type="text"
            id="item"
          ></input>
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">To do list</h1>
      <ul className="list">
        {toDos.length === 0 && "To Do List is Empty"}
        {toDos.map((todo) => {
          return (
            //if return array in react, each element should have key property
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => switchTodo(todo.id, e.target.checked)}
                />
                {todo.title}
              </label>

              <button
                className="btn btn-danger"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
