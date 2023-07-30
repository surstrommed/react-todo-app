import { Button } from "../ui/Button";
import { Select } from "../ui/Select";
import styles_app from "../../styles/modules/app.module.scss";
import styles_button from "../../styles/modules/button.module.scss";
import { TodoModal } from "./TodoModal";
import useModal from "../../hooks/common/useModal";
import { getClasses } from "../../utils";
import { ChangeEvent } from "react";
import { useAppDispatch } from "../../hooks/redux/useAppDispatch";
import { filterTodo } from "../../store/slices/todoSlice";
import { useAppSelector } from "../../hooks/redux/useAppSelector";
import { getTodoFilterStatus } from "../../store/selectors/todoSelectors";
import { FilterTodoStatus } from "../../models/todo";

export const AppHeader = () => {
  const { isOpen, toggle } = useModal();

  const filterStatus = useAppSelector(getTodoFilterStatus);

  const dispatch = useAppDispatch();

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as FilterTodoStatus;
    dispatch(filterTodo(status));
  };

  return (
    <div className={styles_app.appHeader}>
      <TodoModal isModalOpen={isOpen} toggleModal={toggle} />
      <Button onClick={toggle}>Add task</Button>
      <Select
        id="status"
        mainClassName={getClasses([
          styles_button.button,
          styles_button.button__select,
        ])}
        onChange={handleFilter}
        value={filterStatus}
      >
        <option value="all" defaultChecked>
          All
        </option>
        <option value="uncompleted">Uncompleted</option>
        <option value="completed">Completed</option>
      </Select>
    </div>
  );
};
