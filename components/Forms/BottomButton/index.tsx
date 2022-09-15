import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  [key: string]: any;
}

const BottomButton: FC<Props> = ({ children, ...rest }) => {
  return (
    <>
      <div className="fixed left-0 bottom-[env(safe-area-inset-bottom)] pb-safe w-full z-10">
        <button {...rest} className="w-full min-h-[3rem] bg-blue-500 text-white font-bold">
          {children}
        </button>
      </div>
      <div className="fixed left-0 bottom-0 pb-safe w-full">
        <button className="w-full min-h-[2rem] bg-blue-500" />
      </div>
    </>
  );
};

export default BottomButton;
