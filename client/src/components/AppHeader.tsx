import { Button } from "./Button";
import { Select } from "./Select";
import styles_app from "../styles/modules/app.module.scss";
import styles_button from "../styles/modules/button.module.scss";
import { TodoModal } from "./TodoModal";
import useModal from "../hooks/useHooks";
import { getClasses } from "../utils/getClasses";

export const AppHeader = () => {
  const { isOpen, toggle } = useModal();

  return (
    <div className={styles_app.appHeader}>
      <Button onClick={toggle}>Add task</Button>
      <Select
        id="status"
        mainClassName={getClasses([
          styles_button.button,
          styles_button.button__select,
        ])}
      >
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
      </Select>
      <TodoModal isModalOpen={isOpen} toggleModal={toggle} />
    </div>
  );
};
