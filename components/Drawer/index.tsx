import { FC, useEffect, useState } from "react";

interface Props {
  onClick: any;
}

const Drawer: FC<Props> = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const menus = [
    "배터리 케어 서비스",
    "전기차 충전소 정보",
    "전기차 이야기",
    "마이페이지",
    "고객센터",
    "설정",
  ];

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      onClick();
    }, 300);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    });
  }, []);

  return (
    <aside className="relative z-10">
      <div className="fixed bg-black opacity-40 w-full h-full top-0 left-0"></div>
      <div
        className={`fixed h-screen p-4 overflow-y-auto bg-white w-[19rem] top-0 right-0 transform ease-in-out transition-all duration-300 
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full justify-between">
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center "
            onClick={handleClose}
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close</span>
          </button>
          <ul className="space-y-[1rem] pt-[4rem]">
            {menus.map((menu, index) => (
              <li key={index} className="text-[1.2rem]">
                {menu}
              </li>
            ))}
          </ul>
          <span className="text-gray-500 text-sm">서비스 이용약관 • 개인정보 처리방침</span>
        </div>
      </div>
    </aside>
  );
};

export default Drawer;
