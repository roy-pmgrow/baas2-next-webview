import Button from "components/Forms/Button";
import Section from "layouts/Section";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaUnlock, FaUser } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { RiArrowRightSLine } from "react-icons/ri";
import { LoginForm } from "types/forms/login";

const Login: FC = () => {
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const { register, watch, setValue, handleSubmit } = useForm<LoginForm>({
    mode: "onChange",
  });

  const onValid = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <Section>
      <form autoComplete="off" onSubmit={handleSubmit(onValid)}>
        <h1 className="text-[1.75rem] font-bold mb-[4rem]">회원 로그인</h1>
        <div className="space-y-[2rem]">
          <div className="flex items-center pb-[1rem] w-full border-b">
            <FaUser
              className={`text-[1.2rem] ${watch("loginId") === "" ? "text-slate-500" : "text-black"}`}
            />
            <input
              {...register("loginId", { value: "" })}
              className="w-full mx-[1rem] outline-none"
              placeholder="이메일 (예: account@domain.com)"
            />
            {watch("loginId") && (
              <IoMdCloseCircle
                className="text-[1.5rem] cursor-pointer text-gray-500"
                onClick={() => setValue("loginId", "")}
              />
            )}
          </div>
          <div className="flex items-center pb-[1rem] w-full border-b">
            <FaUnlock
              className={`text-[1.2rem] ${watch("password") === "" ? "text-slate-500" : "text-black"}`}
            />
            <input
              {...register("password", { value: "" })}
              type={`${isShowing ? "text" : "password"}`}
              className="w-full mx-[1rem] outline-none"
              placeholder="패스워드"
              autoComplete="new-password"
            />
            <div className={`${!watch("password") && "hidden"}`}>
              {isShowing ? (
                <FaEyeSlash
                  className="text-[1.5rem] cursor-pointer text-gray-400 mr-[1rem]"
                  onClick={() => setIsShowing(false)}
                />
              ) : (
                <FaEye
                  className="text-[1.5rem] cursor-pointer text-gray-400 mr-[1rem]"
                  onClick={() => setIsShowing(true)}
                />
              )}
            </div>
            {watch("password") && (
              <IoMdCloseCircle
                className="text-[1.5rem] cursor-pointer text-gray-500"
                onClick={() => setValue("password", "")}
              />
            )}
          </div>
        </div>
        <div className="flex pt-[2rem]">
          <div className="flex items-center mr-[2rem]">
            <input {...register("saved")} id="saved-checkbox" type="checkbox" className="w-4 h-4" />
            <label
              htmlFor="saved-checkbox"
              className={`ml-[0.5rem] text-sm font-medium ${
                watch("saved") ? "text-black" : "text-slate-500"
              }`}
            >
              아이디 저장
            </label>
          </div>
          <div className="flex items-center">
            <input {...register("keeped")} id="keeped-checkbox" type="checkbox" className="w-4 h-4" />
            <label
              htmlFor="keeped-checkbox"
              className={`ml-[0.5rem] text-sm font-medium ${
                watch("keeped") ? "text-black" : "text-slate-500"
              }`}
            >
              로그인 유지
            </label>
          </div>
        </div>
        <div className="mt-[4rem]">
          <Button disabled={!watch("loginId") || !watch("password")}>회원 로그인</Button>
        </div>
        <div className="flex justify-between mt-[1rem]">
          <button className="text-[0.75rem] text-gray-500">아이디 • 패스워드 찾기</button>
          <button className="text-[0.75rem] text-gray-500 flex items-center">
            회원가입
            <RiArrowRightSLine className="text-[0.9rem]" />
          </button>
        </div>
      </form>
    </Section>
  );
};

export default Login;
