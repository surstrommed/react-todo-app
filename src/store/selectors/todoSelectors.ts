import { RootState } from "..";

export const getTodoList = (state: RootState) => state.todo.todoList;
export const getTodoFilterStatus = (state: RootState) =>
  state.todo.filterStatus;
export const getFilteredTodoList = (state: RootState) =>
  state.todo.filteredTodo;
