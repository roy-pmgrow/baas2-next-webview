import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  [key: string]: any;
}

const Button: FC<Props> = ({ children, ...rest }) => {
  return (
    <button
      className="w-full h-[3.5rem] rounded-md font-medium text-[1.1rem bg-blue-500 text-white"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
