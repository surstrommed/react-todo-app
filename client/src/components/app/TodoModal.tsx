import styles from "../../styles/modules/modal.module.scss";
import { MdOutlineClose } from "react-icons/md";
import { Button } from "../ui/Button";
import { ChangeEvent, FormEvent, useState } from "react";
import { Select } from "../ui/Select";
import { addTodo, updateTodo } from "../../store/slices/todoSlice";
import { v4 as uuid } from "uuid";
import { useAppDispatch } from "../../hooks/redux/useAppDispatch";
import { ITodoModal, TodoStatus } from "../../models/todo";
import useSnackBar from "../../hooks/common/useSnackbar";
import {
  SUCCESS_ADDED_TASK,
  SUCCESS_UPDATED_TASK,
} from "../../consts/messages";
import { AnimatePresence, motion } from "framer-motion";

const motionStyles = {
  container: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  dropIn: {
    hidden: {
      opacity: 0,
      transform: "scale(0.9)",
    },
    visible: {
      transform: "scale(1)",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      transform: "scale(0.9)",
      opacity: 0,
    },
  },
};

export const TodoModal = ({
  type = "create",
  todo,
  isModalOpen,
  toggleModal,
}: ITodoModal) => {
  const [title, setTitle] = useState(todo?.title || "");
  const [status, setStatus] = useState<TodoStatus>(
    todo?.status || "uncompleted"
  );
  const action = type === "create" ? "Add" : "Update";

  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackBar();

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as TodoStatus);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (type === "create") {
      dispatch(
        addTodo({
          id: uuid(),
          title,
          status,
          time: new Date().toISOString(),
        })
      );
      setTitle("");
      setStatus("uncompleted");
      showSnackbar({ message: SUCCESS_ADDED_TASK });
    } else if (todo) {
      dispatch(
        updateTodo({
          id: todo.id,
          title,
          status,
          time: new Date().toISOString(),
        })
      );
      showSnackbar({ message: SUCCESS_UPDATED_TASK });
    }
    toggleModal();
  };

  const isSaveBtnDisabled =
    !title ||
    (type === "update" &&
      todo &&
      title === todo.title &&
      status === todo.status);

  if (!isModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.wrapper}
        initial={motionStyles.container.initial}
        animate={motionStyles.container.animate}
        exit={motionStyles.container.exit}
      >
        <motion.div
          className={styles.container}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={motionStyles.dropIn}
        >
          <div className={styles.closeButton}>
            <MdOutlineClose
              onClick={toggleModal}
              onKeyDown={toggleModal}
              tabIndex={0}
              role="button"
            />
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.formTitle}>{action} Task</h1>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleChangeTitle}
              />
            </label>
            <label htmlFor="status">
              Status
              <Select
                name="status"
                id="status"
                value={status}
                onChange={handleChangeStatus}
              >
                <option value="uncompleted">Uncompleted</option>
                <option value="completed">Completed</option>
              </Select>
            </label>
            <div className={styles.buttonContainer}>
              <Button type="submit" disabled={isSaveBtnDisabled}>
                {action} task
              </Button>
              <Button variant="secondary" onClick={toggleModal}>
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
