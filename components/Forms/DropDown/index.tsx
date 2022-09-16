import BackDrop from "components/BackDrop";
import { FC, useState } from "react";

interface Props {
  activeIndex: number;
  current: string;
  list: string[];
  onClick: (name: string, index: number) => void;
}

const DropDown: FC<Props> = ({ activeIndex, current, list, onClick }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        data-dropdown-toggle="dropdown"
        className="relative bg-white border-gray-300 border font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center"
        type="button"
        onClick={handleToggle}
      >
        {current.split("(")[0]}
        <svg
          className="ml-1 w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
        {isOpen && (
          <div
            id="dropdown"
            className="absolute left-0 top-[2.7rem] z-30 w-max bg-white rounded-lg divide-y divide-gray-100 text-sm shadow select-none cursor-pointer"
          >
            <ul className="py-1 text-sm text-left">
              {list.map((name, index) => (
                <li
                  key={index}
                  className={`py-2 px-4 hover:bg-gray-100 ${
                    activeIndex === index && "text-blue-500 font-bold"
                  }`}
                  onClick={() => {
                    onClick(name, index);
                    handleToggle();
                  }}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </button>
      {isOpen && <BackDrop handleEvent={handleToggle} />}
    </>
  );
};

export default DropDown;
