import Section from "layouts/Section";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Section>
      <div className="text-[1.75rem] font-bold leading-[2rem]">
        <h1 className="flex">
          <span className="text-blue-500">전기자동차</span>
          <span>곁에</span>
        </h1>
        <h1 className="flex">
          <span>언제나 함께하는 밥#</span>
        </h1>
      </div>
      <div className="py-[1rem]">
        <span className="text-blue-500 font-bold">로그인</span>
        <span className="text-gray-600">하시면, 다양한 서비스 이용이 가능합니다.</span>
      </div>
      <div className="flex space-x-[1rem]">
        <Link href="/login" passHref>
          <a className="border-blue-500 border w-full text-blue-500 py-[0.4rem] text-center">로그인</a>
        </Link>
        <Link href="/signup" passHref>
          <a className="border-blue-500 border w-full text-blue-500 py-[0.4rem] text-center">회원가입</a>
        </Link>
      </div>
    </Section>
  );
};

export default Home;
