import Button from "components/Forms/Button";
import { ContentType, swiperContents } from "data";
import Section from "layouts/Section";
import type { NextPage } from "next";
import Link from "next/link";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

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
      <Swiper
        className="mt-[2rem]"
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        pagination={true}
        modules={[Pagination]}
      >
        {swiperContents.map(({ title, description }: ContentType, index) => (
          <SwiperSlide key={index}>
            <article>
              <div className="w-full h-[10rem] bg-slate-300">&nbsp;</div>
              <h2 className="text-[1.3rem] font-bold mt-[1rem]" dangerouslySetInnerHTML={{ __html: title }} />
              <h3
                className="text-[0.9rem] text-gray-500 mb-[1rem]"
                dangerouslySetInnerHTML={{ __html: description }}
              />
              <Button disabled={false}>바로가기</Button>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

export default Home;
