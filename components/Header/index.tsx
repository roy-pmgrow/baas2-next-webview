import Image from "next/image";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  return (
    <header className="sticky top-0">
      <div className="flex justify-between bg-white p-[1rem]">
        <Image src="/images/logo.png" alt="로고" width={60} height={24} />
        <FiMenu className="text-[1.3rem]" />
      </div>
    </header>
  );
};

export default Header;
