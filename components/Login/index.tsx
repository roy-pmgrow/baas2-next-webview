import Button from "components/Forms/Button";
import Input from "components/Forms/Input";
import Section from "layouts/Section";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { RiArrowRightSLine } from "react-icons/ri";
import { LoginForm } from "types/forms/login";

const Login: FC = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { register, watch, setValue, handleSubmit } = useForm<LoginForm>({
    mode: "onChange",
    defaultValues: {
      loginId: "",
      password: "",
      saved: false,
      keeped: false,
    },
  });

  const onValid = (data: LoginForm) => {
    console.log(data);
    alert(data);
  };

  return (
    <Section>
      <form autoComplete="off" onSubmit={handleSubmit(onValid)}>
        <h1 className="text-[1.75rem] font-bold mb-[4rem]">회원 로그인</h1>
        <div className="space-y-[2rem]">
          <Input
            type="text"
            register={register("loginId", { required: true })}
            watch={watch("loginId")}
            onClick={() => setValue("loginId", "")}
            icon="user"
            placeholder="이메일 (예: account@domain.com)"
          />
          <Input
            type={`${isShow ? "text" : "password"}`}
            register={register("password", { required: true })}
            watch={watch("password")}
            onClick={() => setValue("password", "")}
            icon="password"
            placeholder="패스워드"
          />
          {/* <div className="flex items-center pb-[1rem] w-full border-b">
            <FaUser
              className={`min-w-[1.2rem] text-[1.2rem] ${
                watch("loginId") === "" ? "text-slate-500" : "text-black"
              }`}
            />
            <input
              {...register("loginId", { required: true })}
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
              className={`min-w-[1.2rem] text-[1.2rem] ${
                watch("password") === "" ? "text-slate-500" : "text-black"
              }`}
            />
            <input
              {...register("password", { required: true })}
              type={`${isShow ? "text" : "password"}`}
              className="w-full mx-[1rem] outline-none"
              placeholder="패스워드"
              autoComplete="new-password"
            />
            <div className={`${!watch("password") && "hidden"}`}>
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
            {watch("password") && (
              <IoMdCloseCircle
                className="text-[1.5rem] cursor-pointer text-gray-500"
                onClick={() => setValue("password", "")}
              />
            )}
          </div> */}
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
          <Button type="submit" disabled={!watch("loginId") || !watch("password")}>
            회원 로그인
          </Button>
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
