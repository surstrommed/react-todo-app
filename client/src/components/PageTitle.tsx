import { PropsWithChildren } from "react";
import styles from "../styles/modules/title.module.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {}

export const PageTitle = ({ children, ...rest }: PropsWithChildren<Props>) => {
  return (
    <p className={styles.title} {...rest}>
      {children}
    </p>
  );
};
