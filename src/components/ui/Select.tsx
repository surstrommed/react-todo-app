import { PropsWithChildren } from "react";
import { ISelect } from "../../models/select";

export const Select = ({
  mainClassName,
  children,
  ...rest
}: PropsWithChildren<ISelect>) => {
  return (
    <select className={mainClassName} {...rest}>
      {children}
    </select>
  );
};
