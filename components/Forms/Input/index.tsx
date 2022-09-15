import { FC, useState } from "react";
import { FaEye, FaEyeSlash, FaUnlock, FaUser } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

interface Props {
  icon: "user" | "password";
  [key: string]: any;
}

const Input: FC<Props> = ({ icon, register, watch, onClick, ...rest }) => {
  const [isShow, setIsShow] = useState<boolean>(false);

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
      <input
        {...register}
        {...rest}
        type={`${icon !== "password" ? "text" : isShow ? "text" : "password"}`}
        className="w-full mx-[0.5rem] outline-none border-transparent focus:border-transparent focus:ring-0"
        autoComplete="new-password"
      />
      {icon === "password" && (
        <div className={`${!watch && "hidden"}`}>
          {isShow ? (
            <FaEyeSlash
              className="text-[1.5rem] cursor-pointer text-gray-400 mr-[1rem]"
              onClick={() => setIsShow(false)}
            />
          ) : (
            <FaEye
              className="text-[1.5rem] cursor-pointer text-gray-400 mr-[1rem]"
              onClick={() => setIsShow(true)}
            />
          )}
        </div>
      )}
      {watch && <IoMdCloseCircle className="text-[1.5rem] cursor-pointer text-gray-500" onClick={onClick} />}
    </div>
  );
};

export default Input;
