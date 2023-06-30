import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import "./App.css";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Box: React.FC<PropsWithChildren> = ({ children }) => (
  <div style={{ padding: "1rem", fontWeight: "bold" }}>{children}</div>
);

const List: React.FC<{
  items: string[];
  onClick?: (item: string) => void;
}> = ({ items, onClick }) => (
  <ul>
    {items.map((item) => (
      <li key={item} onClick={onClick?.bind(null, item)}>
        {item}
      </li>
    ))}
  </ul>
);

interface Payload {
  text: string;
}

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type ActionType =
  | {
      type: "ADD";
      text: string;
    }
  | { type: "REMOVE"; id: number };

function App() {
  const [payload, setPayload] = useState<Payload | null>(null);

  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [...state, { id: state.length, done: false, text: action.text }];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);

      default:
        return state;
    }
  }, []);

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onListClick = useCallback((item: string) => {
    alert(item);
  }, []);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({ type: "ADD", text: newTodoRef.current.value });
      newTodoRef.current.value = "";
    }
  }, [newTodoRef]);

  useEffect(() => {
    fetch("/data.json")
      .then((resp) => resp.json())
      .then((data) => setPayload(data));
  }, []);

  return (
    <div>
      <Heading title="Introduction" />
      <Box>Hello there!</Box>
      <List items={["1", "2", "3"]} onClick={onListClick} />
      <Box>{JSON.stringify(payload)}</Box>

      <Heading title="Todos" />
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}

          <button onClick={() => dispatch({ type: "REMOVE", id: todo.id })}>
            Delete
          </button>
        </div>
      ))}
      <Box>
        <input type="text" ref={newTodoRef} />
        <button onClick={onAddTodo}>Add Todo</button>
      </Box>
    </div>
  );
}

export default App;
