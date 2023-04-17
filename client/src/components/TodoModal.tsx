import styles from "../styles/modules/modal.module.scss";
import { MdOutlineClose } from "react-icons/md";
import { Button } from "./Button";
import { ChangeEvent, FormEvent, useState } from "react";
import { Select } from "./Select";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/slices/todoSlice";
import { v4 as uuid } from "uuid";

type Props = {
  isModalOpen: boolean;
  toggleModal: () => void;
};

type Status = "incomplete" | "complete";

export const TodoModal = ({ isModalOpen, toggleModal }: Props) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<Status>("incomplete");

  const dispatch = useDispatch();

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as Status);
  };

  const handleModalClose = () => {
    if (isModalOpen) {
      setTitle("");
      setStatus("incomplete");
    }
    toggleModal();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title && status) {
      dispatch(
        addTodo({
          id: uuid(),
          title,
          status,
          time: new Date().toISOString(),
        })
      );
    }
    toggleModal();
  };

  if (!isModalOpen) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.closeButton}>
          <MdOutlineClose
            onClick={handleModalClose}
            onKeyDown={handleModalClose}
            tabIndex={0}
            role="button"
          />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.formTitle}>Add Task</h1>
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
              <option value="incomplete">Incomplete</option>
              <option value="complete">Complete</option>
            </Select>
          </label>
          <div className={styles.buttonContainer}>
            <Button type="submit">Add task</Button>
            <Button variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
