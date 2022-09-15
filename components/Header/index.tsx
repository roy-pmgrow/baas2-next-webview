import Drawer from "components/Drawer";
import useScrollPosition from "hooks/useScrollPosition";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { HiArrowLeft } from "react-icons/hi";

const Header = () => {
  const { pathname, back } = useRouter();
  const scrollPosition = useScrollPosition();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const handleToggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <>
      <header className="sticky top-0">
        <div
          className={`flex justify-between bg-white p-[1rem] 
        ${scrollPosition >= 20 && "shadow"} `}
        >
          {pathname === "/" ? (
            <Image src="/images/logo.png" alt="로고" width={60} height={24} />
          ) : (
            <HiArrowLeft className="text-[1.3rem]" onClick={back} />
          )}
          <FiMenu className="text-[1.3rem]" role="button" onClick={handleToggleDrawer} />
        </div>
      </header>
      {showDrawer && <Drawer onClick={handleToggleDrawer} />}
    </>
  );
};

export default Header;
