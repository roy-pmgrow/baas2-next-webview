import { FC, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  handleEvent: () => void;
}

const BackDrop: FC<Props> = ({ handleEvent }) => {
  const ref = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  const handleClose = () => {
    handleEvent();
  };

  useEffect(() => {
    setMounted(true);

    const modal = document.createElement("div");
    modal.setAttribute("id", "backdrop");
    document.body.appendChild(modal);

    ref.current = modal;

    const escClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleEvent();
    };
    window.addEventListener("keydown", escClose);

    return () => {
      document.body.removeChild(modal);
      window.removeEventListener("keydown", escClose);
    };
  }, []);

  return ref.current && mounted
    ? createPortal(
        <div className="fixed top-0 left-0 w-full h-full z-0" onClick={handleClose} onWheel={handleClose} />,
        ref.current,
      )
    : null;
};

export default BackDrop;
