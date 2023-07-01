import { useCallback, useEffect, useReducer } from "react";
import { createGlobalState } from "react-use";

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

const useGlobalTodos = createGlobalState<Todo[]>([]);

export function useTodos(initialTodos: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} {
  const [todos, setTodos] = useGlobalTodos();

  const addTodo = useCallback(
    (text: string) => {
      setTodos((todos) => [...todos, { id: todos.length, text, done: false }]);
    },
    [todos]
  );

  const removeTodo = useCallback(
    (removedId: number) => {
      setTodos((todos) => todos.filter(({ id }) => id !== removedId));
    },
    [todos]
  );

  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos]);

  return {
    todos,
    addTodo,
    removeTodo,
  };
}
