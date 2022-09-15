import { useAtom } from "jotai";
import cloneDeep from "lodash.clonedeep";
import { FC, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { modalAtom } from "store";

const Modal: FC = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  const [modal, setModal] = useAtom(modalAtom);

  const handleClose = () => {
    modal.message = "";
    setModal(cloneDeep(modal));
  };

  useEffect(() => {
    setMounted(true);
    const modal = document.createElement("div");
    modal.setAttribute("id", "modal");
    document.body.appendChild(modal);

    ref.current = modal;

    const closeKeyboard = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
        case "Enter":
          handleClose();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", closeKeyboard);

    return () => {
      document.body.removeChild(modal);
      window.removeEventListener("keydown", closeKeyboard);
    };
  }, []);

  return modal.message !== "" && ref.current && mounted
    ? createPortal(
        <div className="fixed top-0 left-0 max-w-lg h-full z-10">
          <div className="opacity-40 bg-black w-full h-full fixed z-20"></div>
          <div className="flex items-center w-full h-full fixed z-30">
            <div className="flex flex-col w-full">
              <div className="bg-white mx-auto w-[85%] p-10 rounded-lg space-y-[1rem] text-center">
                <span className="text-center">{modal.message}</span>
                <button
                  className="w-full h-[2.5rem] rounded-md font-medium text-[1.1rem] bg-blue-500 text-white"
                  onClick={handleClose}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>,
        ref.current,
      )
    : null;
};

export default Modal;
