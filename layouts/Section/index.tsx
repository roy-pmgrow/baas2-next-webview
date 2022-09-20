import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Section: FC<Props> = ({ children }) => {
  return <div className="flex-col min-h-screen pb-[2rem] px-[1rem]">{children}</div>;
};

export default Section;
