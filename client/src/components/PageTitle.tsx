import { ReactNode } from "react";

type PropsWithChildren<P> = P & { children?: ReactNode };

export const PageTitle = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div>
      <h1>{children}</h1>
    </div>
  );
};
