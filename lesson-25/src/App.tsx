import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useRef,
} from "react";
import "./App.css";
import { TodosProvider, useAddTodo, useRemoveTodo, useTodos } from "./useTodos";

type ButtonProps = PropsWithChildren<
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { title?: string }
>;

const Button: React.FC<ButtonProps> = ({ title, children, style, ...rest }) => (
  <button
    {...rest}
    style={{
      ...style,
      backgroundColor: "red",
      color: "white",
      fontSize: "xx-large",
    }}
  >
    {title ?? children}
  </button>
);

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Box: React.FC<PropsWithChildren> = ({ children }) => (
  <div style={{ padding: "1rem", fontWeight: "bold" }}>{children}</div>
);

function UL<T>({
  items,
  render,
  itemsClick,
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> & {
  items: T[];
  render: (item: T) => React.ReactNode;
  itemsClick: (item: T) => void;
}) {
  return (
    <ul {...rest}>
      {items.map((item, index) => (
        <li key={index} onClick={() => itemsClick(item)}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

function App() {
  const todos = useTodos();
  const addTodo = useAddTodo();
  const removeTodo = useRemoveTodo();

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = "";
    }
  }, [newTodoRef, addTodo]);

  return (
    <div>
      <Heading title="Introduction" />
      <Box>Hello there!</Box>

      <Heading title="Todos" />

      <UL
        items={todos}
        render={(todo) => (
          <>
            {todo.text}

            <Button onClick={() => removeTodo(todo.id)}>Delete</Button>
          </>
        )}
        itemsClick={(item) => alert(item)}
      />

      <Box>
        <input type="text" ref={newTodoRef} />

        <Button onClick={onAddTodo}>Add Todo</Button>
      </Box>

      <Button>Click me</Button>
    </div>
  );
}

const JustShowTodo = () => {
  const todos = useTodos();

  return (
    <UL
      items={todos}
      render={(todo) => todo.text}
      itemsClick={(item) => alert(item)}
    />
  );
};

const AppWrapper = () => (
  <TodosProvider
    initialTodos={[{ id: 0, text: "Hey there useContext", done: false }]}
  >
    <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
      <App />
      <JustShowTodo />
    </div>
  </TodosProvider>
);

export default AppWrapper;
