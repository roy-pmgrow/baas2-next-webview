import Button from "components/Forms/Button";
import { FC, ReactNode } from "react";

interface Props {
  chidren: ReactNode;
}

const Modal: FC<Props> = ({ chidren }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-10">
      <div className="opacity-40 bg-black w-full h-full fixed z-20"></div>
      <div className="flex items-center w-full h-full fixed z-30">
        <div className="flex flex-col w-full">
          <div className="bg-white mx-auto w-[85%] p-10 rounded-lg space-y-[1rem]">
            <span>{chidren}</span>
            <Button>확인</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
