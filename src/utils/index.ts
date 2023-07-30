import { MONTH_NAMES } from "../consts";
import { FilterTodoStatus, Todo } from "../models/todo";

export const getClasses = (classes: string[]) => {
  return classes.filter(Boolean).join(" ").trim();
};

export const formateDate = (date: string) => {
  const pad = (v: number) => `0${v}`.slice(-2);
  const d = new Date(date);
  return `${pad(d.getDate())} ${
    MONTH_NAMES[d.getMonth()]
  } ${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export const sortTodoListByDateDesc = (todoList: Todo[]) =>
  todoList.sort(
    (todo1, todo2) => Date.parse(todo2.time) - Date.parse(todo1.time)
  );

export const getTodoListByStatus = (
  todoList: Todo[],
  status: FilterTodoStatus
) =>
  todoList.filter((todo) => (status !== "all" ? todo.status === status : true));

export const getNoEventsText = (status: FilterTodoStatus) => {
  if (status === "completed") {
    return "There are no completed tasks yet";
  } else if (status === "uncompleted") {
    return "There are no uncompleted tasks yet";
  } else {
    return "There are no tasks yet";
  }
};
