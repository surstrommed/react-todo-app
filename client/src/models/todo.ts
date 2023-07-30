export type TodoStatus = "uncompleted" | "completed";
export type FilterTodoStatus = "all" | TodoStatus;

export interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
  time: string;
}

export interface TodoStoreState {
  todoList: Todo[];
  filterStatus: FilterTodoStatus;
  filteredTodo: Todo[];
}

export interface ITodoModal {
  isModalOpen: boolean;
  toggleModal: () => void;
  type?: "create" | "update";
  todo?: Todo;
}

export interface ITodoItem {
  todo: Todo;
}
