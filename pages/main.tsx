import Button from "components/Forms/Button";
import Section from "layouts/Section";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const MainPage: NextPage = () => {
  const { push } = useRouter();
  const handleAdd = () => {
    push("/ev/add");
  };

  return (
    <Section>
      <div>
        <h3 className="text-gray-500">EV 모델</h3>
      </div>
      <Swiper
        className="mt-[1rem]"
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        <SwiperSlide className="cursor-pointer" onClick={handleAdd}>
          <div className="aspect-video bg-slate-200 rounded-lg flex flex-col justify-center items-center">
            <FaPlus className="text-[3rem] text-gray-500 mb-[1rem]" />
            <h3 className="text-gray-500">차량을 선택해주세요.</h3>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="flex flex-col space-y-[1.5rem]">
        <input className="p-3 bg-gray-100 rounded-lg" placeholder="출발지 검색" />
        <input className="p-3 bg-gray-100 rounded-lg" placeholder="도착지 검색" />
      </div>
      <div className="flex space-x-[1rem] mt-[3rem]">
        <Button className="bg-amber-500">자동 모의주행</Button>
        <Button>시뮬레이션</Button>
      </div>
    </Section>
  );
};

export default MainPage;
