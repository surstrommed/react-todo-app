import { PropsWithChildren } from "react";
import styles from "../../styles/modules/button.module.scss";
import { getClasses } from "../../utils";
import { ButtonTypes, IButton } from "../../models/button";

export const Button = ({
  children,
  type = "button",
  variant = "primary",
  disabled,
  ...rest
}: PropsWithChildren<IButton>) => {
  return (
    <button
      className={getClasses([
        styles.button,
        styles[`button--${ButtonTypes[variant]}`],
        disabled && styles["button--disabled"],
      ])}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};
