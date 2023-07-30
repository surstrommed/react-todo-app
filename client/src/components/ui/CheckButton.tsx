import { ICheckButton } from "../../models/button";
import styles from "../../styles/modules/todoItem.module.scss";
import { motion, useMotionValue, useTransform } from "framer-motion";

const motionStyles = {
  check: {
    initial: {
      color: "#fff",
    },
    checked: { pathLength: 1 },
    unchecked: { pathLength: 0 },
  },
  box: {
    checked: {
      background: "var(--primaryPurple)",
      transition: { duration: 0.1 },
    },
    unchecked: { background: "var(--gray-2)", transition: { duration: 0.1 } },
  },
};

export const CheckButton = ({ checked, handleCheck }: ICheckButton) => {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);
  const animate = checked ? "checked" : "unchecked";

  return (
    <motion.div
      animate={animate}
      className={styles.svgBox}
      variants={motionStyles.box}
      onClick={handleCheck}
    >
      <motion.svg
        className={styles.svg}
        viewBox="0 0 53 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          variants={motionStyles.check}
          animate={animate}
          style={{ pathLength, opacity }}
          fill="none"
          strokeMiterlimit="10"
          strokeWidth="6"
          d="M1.5 22L16 36.5L51.5 1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </motion.svg>
    </motion.div>
  );
};
