import Drawer from "components/Drawer";
import useScrollPosition from "hooks/useScrollPosition";
import Image from "next/image";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  const scrollPosition = useScrollPosition();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const handleToggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <header className="sticky top-0">
      <div
        className={`flex justify-between bg-white p-[1rem] 
        ${scrollPosition >= 20 && "shadow"} `}
      >
        <Image src="/images/logo.png" alt="로고" width={60} height={24} />
        <FiMenu className="text-[1.3rem]" onClick={handleToggleDrawer} />
        <div className="absolute">{showDrawer && <Drawer onClick={handleToggleDrawer} />}</div>
      </div>
    </header>
  );
};

export default Header;
