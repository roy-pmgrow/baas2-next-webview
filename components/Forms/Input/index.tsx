import { FC } from "react";
import { FaUnlock, FaUser } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

interface Props {
  icon: "user" | "password";
  [key: string]: any;
}

const Input: FC<Props> = ({ icon, register, watch, onClick, ...rest }) => {
  return (
    <div className="flex items-center pb-[1rem] w-full border-b">
      {icon === "user" && (
        <FaUser
          className={`min-w-[1.2rem] text-[1.2rem] ${watch === "" ? "text-slate-500" : "text-black"}`}
        />
      )}
      {icon === "password" && (
        <FaUnlock
          className={`min-w-[1.2rem] text-[1.2rem] ${watch === "" ? "text-slate-500" : "text-black"}`}
        />
      )}
      <input {...rest} {...register} className="w-full mx-[1rem] outline-none" />
      {watch && <IoMdCloseCircle className="text-[1.5rem] cursor-pointer text-gray-500" onClick={onClick} />}
    </div>
  );
};

export default Input;
