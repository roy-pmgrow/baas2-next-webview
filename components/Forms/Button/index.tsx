import { FC, ReactNode } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
  [key: string]: any;
}

const Button: FC<Props> = ({ className = "bg-blue-500", children, ...rest }) => {
  return (
    <button
      className={`w-full h-[3.5rem] rounded-md font-medium text-[1.1rem] text-white ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
