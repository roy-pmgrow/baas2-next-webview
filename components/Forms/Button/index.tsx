import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  disabled?: boolean;
  [key: string]: any;
}

const Button: FC<Props> = ({ children, disabled = true, rest }) => {
  console.log(disabled);
  return (
    <button
      className={`w-full h-[3.5rem] rounded-md font-medium text-[1.1rem] ${
        disabled ? "bg-gray-200 text-gray-400" : "bg-blue-500 text-white"
      }`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
