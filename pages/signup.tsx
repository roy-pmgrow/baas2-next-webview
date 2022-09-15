import CheckBox from "components/Forms/Checkbox";
import Input from "components/Forms/Input";
import Section from "layouts/Section";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { SignUpForm } from "types/forms/signup";

const SignupPage: NextPage = () => {
  const { register, watch, setValue, handleSubmit } = useForm<SignUpForm>({
    mode: "onChange",
    defaultValues: {
      loginId: "",
      password: "",
      confirmPassword: "",
      serviceTerms: false,
      emailReceive: false,
    },
  });

  const onValid = (data: SignUpForm) => {
    console.log(data);
  };

  return (
    <Section>
      <form autoComplete="off" onSubmit={handleSubmit(onValid)}>
        <h1 className="text-3xl font-bold mb-[0.5rem]">회원가입</h1>
        <h3 className="text-sm text-gray-500 mb-[4rem]">
          이용 약관 동의 및 가입 정보 입력 후 즉시 가입 가능합니다.
        </h3>
        <div className="space-y-[2rem] px-[0.5rem]">
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
            placeholder="패스워드 (특수문자 포함 8~16자리)"
          />
          <Input
            register={register("confirmPassword", { required: true })}
            watch={watch("confirmPassword")}
            onClick={() => setValue("confirmPassword", "")}
            icon="password"
            placeholder="패스워드"
          />
        </div>
        <div className="flex flex-col mt-[2rem] p-[1rem] bg-gray-100 rounded-lg space-y-[1rem]">
          <div className="flex justify-between w-full">
            <CheckBox id="serviceTerms" register={register("serviceTerms")} watch={watch("serviceTerms")}>
              서비스 이용약관 동의
            </CheckBox>
            <span className="underline text-sm text-slate-500">보기</span>
          </div>
          <CheckBox id="emailReceive" register={register("emailReceive")} watch={watch("emailReceive")}>
            이메일 수신 동의
          </CheckBox>
          <span className="text-gray-400 text-sm">* 수신 동의 시 차량 맞춤형 정보를 얻으실 수 있습니다.</span>
        </div>
      </form>
    </Section>
  );
};

export default SignupPage;
