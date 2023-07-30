import { useEffect, useState } from "react";
import { NewTodoForm } from "./NewTodoForm";
import "./styles.css";
import { TodoList } from "./TodoList";

//js key word: class, for
//one func can only return 1 element: 1. wrap all things in a div
//2 .use a fragment
export default function App() {
  //const [newItem, setNewItem] = useState(""); //modify a value
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  // const [toDos, setTodos] = useState([]);
  //prevent the page from refesh when pressing add

  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
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
      <NewTodoForm onSubmit={addTodo} />
      {/* custom component */}
      <h1 className="header">To do list</h1>
      <TodoList todos={todos} switchTodo={switchTodo} deleteTodo={deleteTodo} />
    </>
  );
}
