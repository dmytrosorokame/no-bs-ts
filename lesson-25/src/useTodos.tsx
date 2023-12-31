import {
  useCallback,
  useReducer,
  createContext,
  useContext,
  PropsWithChildren,
} from "react";

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

type UseTodosManagerResult = ReturnType<typeof useTodosManager>;

export const TodoContext = createContext<UseTodosManagerResult>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
});

function useTodosManager(initialTodos: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} {
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [...state, { id: state.length, done: false, text: action.text }];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);

      default:
        return state;
    }
  }, initialTodos);

  const addTodo = useCallback((text: string) => {
    dispatch({ type: "ADD", text });
  }, []);

  const removeTodo = useCallback((id: number) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  return {
    todos,
    addTodo,
    removeTodo,
  };
}

export const TodosProvider: React.FC<
  PropsWithChildren<{ initialTodos: Todo[] }>
> = ({ children, initialTodos }) => {
  return (
    <TodoContext.Provider value={useTodosManager(initialTodos)}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = (): Todo[] => {
  const { todos } = useContext(TodoContext);

  return todos;
};

export const useAddTodo = (): UseTodosManagerResult["addTodo"] => {
  const { addTodo } = useContext(TodoContext);

  return addTodo;
};

export const useRemoveTodo = (): UseTodosManagerResult["removeTodo"] => {
  const { removeTodo } = useContext(TodoContext);

  return removeTodo;
};
