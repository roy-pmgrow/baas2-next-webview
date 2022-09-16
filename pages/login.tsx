import userApi from "apis/user";
import CheckBox from "components/Forms/Checkbox";
import DisabledButton from "components/Forms/DisabledButton";
import Input from "components/Forms/Input";
import { useAtom } from "jotai";
import jwtDecode from "jwt-decode";
import Section from "layouts/Section";
import cloneDeep from "lodash.clonedeep";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FieldErrors, useForm } from "react-hook-form";
import { RiArrowRightSLine } from "react-icons/ri";
import { modalAtom, userAtom } from "store";
import { LoginForm } from "types/forms/login";

const LoginPage: NextPage = () => {
  const { replace } = useRouter();
  const [modal, setModal] = useAtom(modalAtom);
  const [user, setUser] = useAtom(userAtom);
  const { register, watch, setValue, handleSubmit } = useForm<LoginForm>({
    mode: "onChange",
    defaultValues: {
      loginId: "",
      password: "",
      saved: false,
      keeped: false,
    },
  });

  const login = async ({ loginId, password, saved, keeped }: LoginForm) => {
    try {
      const { token } = await userApi.login(loginId, password, saved, keeped);
      const decoded = jwtDecode(token) as any;
      user.token = token;
      user.loginId = decoded.user_id;
      setUser(cloneDeep(user));
      localStorage.setItem("token", token);
      replace("/main");
    } catch (error) {
      modal.message = error as string;
      setModal(cloneDeep(modal));
    }
  };

  const onValid = (data: LoginForm) => {
    login(data);
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <Section>
      <form autoComplete="off" onSubmit={handleSubmit(onValid, onInvalid)}>
        <h1 className="text-3xl font-bold mb-[4rem]">회원 로그인</h1>
        <div className="space-y-[2rem] px-[0.5rem]">
          <Input
            type="email"
            register={register("loginId", { required: "이메일을 입력해주세요." })}
            watch={watch("loginId")}
            onClick={() => setValue("loginId", "")}
            icon="user"
            placeholder="이메일 (예: account@domain.com)"
          />
          <Input
            register={register("password", {
              required: "비밀번호를 입력해주세요",
            })}
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
          <DisabledButton type="submit" disabled={!watch("loginId") || !watch("password")}>
            회원 로그인
          </DisabledButton>
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

export default LoginPage;
