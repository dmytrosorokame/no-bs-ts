import create from "zustand";

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

const useTodos = create<{
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (removeId: number) => void;
}>((set) => ({
  todos: [],
  addTodo: (text: string) =>
    set((state) => ({
      ...state,
      todos: [...state.todos, { id: state.todos.length, text, done: false }],
    })),
  removeTodo: (removedId: number) =>
    set((state) => ({
      ...state,
      todos: state.todos.filter(({ id }) => id !== removedId),
    })),
}));

export default useTodos;
