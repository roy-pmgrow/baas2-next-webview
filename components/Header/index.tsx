import useScrollPosition from "hooks/useScrollPosition";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  const scrollPosition = useScrollPosition();
  console.log(scrollPosition);

  return (
    <header className="sticky top-0">
      <div
        className={`flex justify-between bg-white p-[1rem] 
        ${scrollPosition >= 20 && "shadow"} `}
      >
        <Image src="/images/logo.png" alt="로고" width={60} height={24} />
        <FiMenu className="text-[1.3rem]" />
      </div>
    </header>
  );
};

export default Header;
