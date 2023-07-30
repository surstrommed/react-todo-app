export enum ButtonTypes {
  primary = "primary",
  secondary = "secondary",
}

export interface IButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  type?: "submit" | "button";
  variant?: keyof typeof ButtonTypes;
}

export interface ICheckButton {
  checked: boolean;
  handleCheck: () => void;
}
