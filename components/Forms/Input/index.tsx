import { FC } from "react";
import { IoMdCloseCircle } from "react-icons/io";

interface Props {
  onClear: () => void;
  [key: string]: any;
}

const Input: FC<Props> = ({ type, register, watch, onFocus, onBlur, onClear, ...rest }) => {
  return (
    <div className="p-3 bg-gray-100 rounded-lg flex items-center">
      <input {...register} {...rest} className="bg-gray-100 w-full" onFocus={onFocus} />
      {watch && <IoMdCloseCircle className="text-[1.5rem] cursor-pointer text-gray-500" onClick={onClear} />}
    </div>
  );
};

export default Input;
