import { PropsWithChildren } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  mainClassName?: string;
}

export const Select = ({
  mainClassName,
  children,
  ...rest
}: PropsWithChildren<Props>) => {
  return (
    <select className={mainClassName} {...rest}>
      {children}
    </select>
  );
};
