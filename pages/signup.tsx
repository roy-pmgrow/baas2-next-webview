import userApi from "apis/user";
import BottomButton from "components/Forms/BottomButton";
import CheckBox from "components/Forms/Checkbox";
import IconInput from "components/Forms/IconInput";
import Modal from "components/Modal";
import DefaultModal from "components/Modal/DefaultModal";
import { useAtom } from "jotai";
import Section from "layouts/Section";
import cloneDeep from "lodash.clonedeep";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FieldErrors, useForm } from "react-hook-form";
import regex from "regex";
import { modalAtom } from "store";
import { SignUpForm } from "types/forms/signup";

const SignupPage: NextPage = () => {
  const { replace } = useRouter();
  const [modal, setModal] = useAtom(modalAtom);
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

  const signup = async ({ loginId, password }: SignUpForm) => {
    try {
      await userApi.signup(loginId, password);
      modal.message = "회원가입을 완료하였습니다";
      setModal(cloneDeep(modal));
      replace("/");
    } catch (error) {
      modal.message = error as string;
      setModal(cloneDeep(modal));
    }
  };

  const onValid = (data: SignUpForm) => {
    signup(data);
  };

  const onInvalid = (errors: FieldErrors) => {
    if (errors["loginId"]) modal.showMessage(errors["loginId"]?.message as string);
    else if (errors["password"]) modal.showMessage(errors["password"]?.message as string);
    else if (errors["confirmPassword"]) modal.showMessage(errors["confirmPassword"]?.message as string);
    setModal(cloneDeep(modal));
  };

  const handleClose = () => {
    modal.hide();
    setModal(cloneDeep(modal));
  };

  return (
    <Section>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Head>
      <form autoComplete="off" onSubmit={handleSubmit(onValid, onInvalid)}>
        <h1 className="text-3xl font-bold mb-[0.5rem]">회원가입</h1>
        <h3 className="text-sm text-gray-500 mb-[4rem]">
          이용 약관 동의 및 가입 정보 입력 후 즉시 가입 가능합니다.
        </h3>
        <div className="space-y-[2rem] px-[0.5rem]">
          <IconInput
            type="email"
            register={register("loginId", { required: "이메일을 입력해주세요." })}
            watch={watch("loginId")}
            onClick={() => setValue("loginId", "")}
            icon="user"
            placeholder="이메일 (예: account@domain.com)"
          />
          <IconInput
            register={register("password", {
              required: "비밀번호를 입력해주세요",
              pattern: {
                value: regex.password,
                message: "패스워드는 특수문자 포함 8~16자리 입력해주세요.",
              },
            })}
            watch={watch("password")}
            onClick={() => setValue("password", "")}
            icon="password"
            placeholder="패스워드 (특수문자 포함 8~16자리)"
          />
          <IconInput
            register={register("confirmPassword", {
              required: "비밀번호 확인을 입력해주세요.",
              validate: {
                checkPassword: (value) => value === watch("password") || "비밀번호가 일치하지 않습니다.",
              },
            })}
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

        <BottomButton type="submit">가입 신청</BottomButton>
      </form>
      {modal.toggle && (
        <Modal handleClose={handleClose}>
          <DefaultModal message={modal.message} />
        </Modal>
      )}
    </Section>
  );
};

export default SignupPage;
