import { useCallback, useEffect, useReducer } from "react";
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

const todoMachine = createMachine<
  { todos: Todo[] },
  | { type: "START_WORKING" }
  | { type: "END_WORKING" }
  | {
      type: "SET_TODOS";
      todos: Todo[];
    }
  | { type: "ADD_TODO"; text: string }
  | { type: "REMOVE_TODO"; removedId: number }
>(
  {
    id: "todoMachine",
    initial: "editing",
    context: {
      todos: [],
    },
    states: {
      editing: {
        on: {
          START_WORKING: {
            target: "working",
            cond: "haveUndoneTodos",
          },
          ADD_TODO: {
            actions: assign({
              todos: ({ todos }, { text }) => [
                ...todos,
                { text, id: todos.length, done: false },
              ],
            }),
          },
          REMOVE_TODO: {
            actions: assign({
              todos: ({ todos }, { removedId }) =>
                todos.filter(({ id }) => id !== removedId),
            }),
          },
          SET_TODOS: {
            actions: assign({
              todos: (_, { todos }) => todos,
            }),
          },
        },
      },
      working: {
        exit: assign({
          todos: ({ todos }) => {
            const newTodos = [...todos];

            const undoneTodo = newTodos.find(({ done }) => !done);

            if (undoneTodo) {
              undoneTodo.done = true;
            }

            return newTodos;
          },
        }),
        on: {
          END_WORKING: {
            target: "editing",
          },
        },
      },
    },
  },
  {
    guards: {
      haveUndoneTodos: ({ todos }) => todos.some((todo) => !todo.done),
    },
  }
);

export function useTodos(initialTodos: Todo[]): {
  isEditing: boolean;
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  startWorking: () => void;
  endWorking: () => void;
} {
  const [state, send] = useMachine(todoMachine);

  const addTodo = useCallback(
    (text: string) => {
      send({
        type: "ADD_TODO",
        text,
      });
    },
    [send]
  );

  const removeTodo = useCallback(
    (id: number) => {
      send({
        type: "REMOVE_TODO",
        removedId: id,
      });
    },
    [send]
  );

  const startWorking = useCallback(() => {
    send("START_WORKING");
  }, [send]);

  const endWorking = useCallback(() => {
    send("END_WORKING");
  }, [send]);

  useEffect(() => {
    send({
      type: "SET_TODOS",
      todos: initialTodos,
    });
  }, [initialTodos, send]);

  return {
    isEditing: state.matches("editing"),
    todos: state.context.todos,
    addTodo,
    removeTodo,
    startWorking,
    endWorking,
  };
}
