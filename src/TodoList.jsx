import { TodoItem } from "./TodoItem";

export function TodoList({ todos, switchTodo, deleteTodo }) {
  return (
    <ul className="list">
      {todos.length === 0 && "No Todos"}
      {todos.map((todo) => {
        return (
          <TodoItem
            {...todo}
            key={todo.id}
            switchTodo={switchTodo}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </ul>
  );
}
