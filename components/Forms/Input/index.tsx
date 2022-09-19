import { FC } from "react";
import { IoMdCloseCircle } from "react-icons/io";

interface Props {
  [key: string]: any;
}

const Input: FC<Props> = ({ register, watch, setValue, ...rest }) => {
  return (
    <div className="p-3 bg-gray-100 rounded-lg flex items-center">
      <input {...register} {...rest} className="bg-gray-100 w-full" />
      {watch && (
        <IoMdCloseCircle
          className="text-[1.5rem] cursor-pointer text-gray-500"
          onClick={() => setValue(register.name, "")}
        />
      )}
    </div>
  );
};

export default Input;
