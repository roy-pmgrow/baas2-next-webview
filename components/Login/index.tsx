import Button from "components/Forms/Button";
import CheckBox from "components/Forms/Checkbox";
import Input from "components/Forms/Input";
import Section from "layouts/Section";
import Link from "next/link";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { RiArrowRightSLine } from "react-icons/ri";
import { LoginForm } from "types/forms/login";

const Login: FC = () => {
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
            register={register("password", { required: true })}
            watch={watch("password")}
            onClick={() => setValue("password", "")}
            icon="password"
            placeholder="패스워드"
          />
        </div>
        <div className="flex pt-[2rem]">
          <CheckBox id="saved" register={register("saved")} watch={watch("saved")} classNames="mr-[2rem]">
            아이디 저장
          </CheckBox>
          <CheckBox id="keeped" register={register("keeped")} watch={watch("keeped")}>
            로그인 유지
          </CheckBox>
        </div>
        <div className="mt-[4rem]">
          <Button type="submit" disabled={!watch("loginId") || !watch("password")}>
            회원 로그인
          </Button>
        </div>
        <div className="flex justify-between mt-[1rem]">
          <button className="text-[0.75rem] text-gray-500">아이디 • 패스워드 찾기</button>
          <Link href="/signup" passHref>
            <a className="text-[0.75rem] text-gray-500 flex items-center">
              회원가입
              <RiArrowRightSLine className="text-[0.9rem]" />
            </a>
          </Link>
        </div>
      </form>
    </Section>
  );
};

export default Login;
