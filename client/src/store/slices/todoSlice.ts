import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FilterTodoStatus, Todo, TodoStoreState } from "../../models/todo";
import { sortTodoListByDateDesc, getTodoListByStatus } from "../../utils";

const initialState: TodoStoreState = {
  todoList: [],
  filterStatus: "all",
  filteredTodo: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, { payload }: PayloadAction<Todo>) => {
      const newList = sortTodoListByDateDesc([...state.todoList, payload]);
      state.todoList = newList;
      state.filteredTodo = getTodoListByStatus(newList, state.filterStatus);
    },
    removeTodo: (state, { payload }: PayloadAction<string>) => {
      const newList = sortTodoListByDateDesc(
        [...state.todoList].filter((todo) => todo.id !== payload)
      );
      state.todoList = newList;
      state.filteredTodo = getTodoListByStatus(newList, state.filterStatus);
    },
    updateTodo: (
      state,
      { payload: { id, title, status, time } }: PayloadAction<Todo>
    ) => {
      const { todoList } = state;
      const todoForUpdate = todoList.find((todo) => todo.id === id);
      const newTodoList = [...todoList].filter((todo) => todo.id !== id);
      if (todoForUpdate) {
        const updatedTodo = {
          ...todoForUpdate,
          title,
          status,
          time,
        };
        const newList = sortTodoListByDateDesc([...newTodoList, updatedTodo]);
        state.todoList = newList;
        state.filteredTodo = getTodoListByStatus(newList, state.filterStatus);
      }
    },
    filterTodo: (state, { payload }: PayloadAction<FilterTodoStatus>) => {
      state.filterStatus = payload;
      state.filteredTodo = getTodoListByStatus(
        sortTodoListByDateDesc(state.todoList),
        payload
      );
    },
  },
});

export const { addTodo, removeTodo, updateTodo, filterTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
