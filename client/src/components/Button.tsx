import { PropsWithChildren } from "react";
import styles from "../styles/modules/button.module.scss";
import { getClasses } from "../utils/getClasses";

const buttonTypes = {
  primary: "primary",
  secondary: "secondary",
};

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  type?: "submit" | "button";
  variant?: keyof typeof buttonTypes;
}

export const Button = ({
  children,
  type = "button",
  variant = "primary",
  ...rest
}: PropsWithChildren<Props>) => {
  return (
    <button
      className={getClasses([
        styles.button,
        styles[`button--${buttonTypes[variant]}`],
      ])}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};
