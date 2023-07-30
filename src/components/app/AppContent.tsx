import { useAppSelector } from "../../hooks/redux/useAppSelector";
import {
  getFilteredTodoList,
  getTodoFilterStatus,
} from "../../store/selectors/todoSelectors";
import { TodoItem } from "./TodoItem";
import styles from "../../styles/modules/app.module.scss";
import { getNoEventsText } from "../../utils";
import { AnimatePresence, motion } from "framer-motion";

const motionStyles = {
  container: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
  child: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  },
};

export const AppContent = () => {
  const filteredTodoList = useAppSelector(getFilteredTodoList);
  const filteredStatus = useAppSelector(getTodoFilterStatus);

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={motionStyles.container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filteredTodoList?.length ? (
          <>
            {filteredTodoList.map((todo) => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </>
        ) : (
          <motion.p className={styles.emptyText} variants={motionStyles.child}>
            {getNoEventsText(filteredStatus)}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
