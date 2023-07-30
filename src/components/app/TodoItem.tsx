import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { ITodoItem } from "../../models/todo";
import styles from "../../styles/modules/todoItem.module.scss";
import { formateDate, getClasses } from "../../utils";
import { useAppDispatch } from "../../hooks/redux/useAppDispatch";
import { removeTodo, updateTodo } from "../../store/slices/todoSlice";
import useSnackBar from "../../hooks/common/useSnackbar";
import {
  SUCCESS_DELETED_TASK,
  SUCCESS_UPDATED_TASK,
} from "../../consts/messages";
import { TodoModal } from "./TodoModal";
import { CheckButton } from "../ui/CheckButton";
import { motion } from "framer-motion";

const motionStyles = {
  child: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  },
};

export const TodoItem = ({ todo }: ITodoItem) => {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const isChecked = todo.status === "completed";
  const [checked, setChecked] = useState(isChecked);

  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackBar();

  useEffect(() => {
    setChecked(isChecked);
  }, [todo.status]);

  const handleDelete = () => {
    dispatch(removeTodo(todo.id));
    showSnackbar({ message: SUCCESS_DELETED_TASK, variant: "error" });
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  const updateModalToggle = () => {
    setUpdateModalOpen((prev) => !prev);
  };

  const handleCheck = () => {
    dispatch(
      updateTodo({
        ...todo,
        status: checked ? "uncompleted" : "completed",
      })
    );
    showSnackbar({ message: SUCCESS_UPDATED_TASK });
  };

  return (
    <>
      {isUpdateModalOpen && (
        <TodoModal
          type="update"
          todo={todo}
          isModalOpen={isUpdateModalOpen}
          toggleModal={updateModalToggle}
        />
      )}
      <motion.div className={styles.item} variants={motionStyles.child}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                todo.status === "completed" && styles["todoText--completed"],
              ])}
            >
              {todo.title}
            </p>
            <p className={styles.time}>{formateDate(todo.time)}</p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div className={styles.icon} onClick={handleDelete} role="button">
            <MdDelete />
          </div>
          <div className={styles.icon} onClick={handleUpdate} role="button">
            <MdEdit />
          </div>
        </div>
      </motion.div>
    </>
  );
};
