import BackDrop from "components/BackDrop";
import { useAtom } from "jotai";
import cloneDeep from "lodash.clonedeep";
import { FC, useEffect, useState } from "react";
import { evAtom } from "store";

interface Props {
  list: string[];
}

const DropDown: FC<Props> = ({ list }) => {
  const [ev, setEv] = useAtom(evAtom);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleToggle = () => setIsOpen(!isOpen);
  const handleSelected = (name: string) => {
    ev.currentManufacturer = name;
    setEv(cloneDeep(ev));
    handleToggle();
  };

  useEffect(() => {
    ev.currentManufacturer = list[0];
    setEv(cloneDeep(ev));
  }, []);

  return (
    <>
      <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        className="bg-white border-gray-300 border font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
        type="button"
        onClick={handleToggle}
      >
        {ev.currentManufacturer}
        <svg
          className="ml-2 w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div
          id="dropdown"
          className="relative z-30 w-max bg-white rounded-lg divide-y divide-gray-100 shadow select-none cursor-pointer"
        >
          <ul className="py-1 text-sm" aria-labelledby="dropdownDefault">
            {list.map((name, index) => (
              <li key={index} className="py-2 px-4 hover:bg-gray-100" onClick={() => handleSelected(name)}>
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {isOpen && <BackDrop handleEvent={handleToggle} />}
    </>
  );
};

export default DropDown;
