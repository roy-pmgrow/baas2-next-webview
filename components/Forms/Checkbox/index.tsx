import { FC, ReactNode } from "react";

interface Props {
  id: string;
  classNames?: string;
  children: ReactNode;
  [key: string]: any;
}

const CheckBox: FC<Props> = ({ id, classNames, children, register, watch, ...rest }) => {
  return (
    <div className={`flex items-center select-none ${classNames}`}>
      <input
        {...register}
        {...rest}
        id={`${id}-checkbox`}
        type="checkbox"
        className="w-4 h-4 bg-transparent border-gray-400 text-blue-500 focus:ring-blue-200"
      />
      <label
        htmlFor={`${id}-checkbox`}
        className={`ml-[0.5rem] text-sm font-medium cursor-pointer
        ${watch ? "text-black" : "text-slate-500"}`}
      >
        {children}
      </label>
    </div>
  );
};

export default CheckBox;
