import { PropsWithChildren } from "react";
import styles from "../../styles/modules/title.module.scss";
import { IPage } from "../../models/page";

export const PageTitle = ({ children, ...rest }: PropsWithChildren<IPage>) => {
  return (
    <p className={styles.title} {...rest}>
      {children}
    </p>
  );
};
