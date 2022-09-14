import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Section: FC<Props> = ({ children }) => {
  return <div className="flex-col bg-white min-h-[100vh] px-[1rem] pt-[1rem]">{children}</div>;
};

export default Section;
