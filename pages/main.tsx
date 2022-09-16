import Button from "components/Forms/Button";
import useQueryMyEvList from "hooks/queries/useQueryMyEvList";
import Section from "layouts/Section";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ResponseEV } from "types/response";

const MainPage: NextPage = () => {
  const { push } = useRouter();
  const { isLoading, data } = useQueryMyEvList();
  const handleAdd = () => {
    push("/ev/add");
  };

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <Section>
      <Swiper
        className="relative -top-3"
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        {data &&
          data.map(({ ev_id, ev_mnfct, ev_model, ev_detl_model, m_mileage, ev_img }: ResponseEV) => (
            <SwiperSlide key={ev_id} className="cursor-pointer">
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                {ev_mnfct} - {ev_model}
              </span>
              <span className="text-xs text-gray-500">
                {ev_detl_model} ({m_mileage} km)
              </span>
              <div className="relative aspect-video">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${ev_img}`}
                  alt={ev_detl_model}
                  layout="fill"
                  className="rounded-lg border select-none"
                />
              </div>
            </SwiperSlide>
          ))}
        <SwiperSlide className="cursor-pointer" onClick={handleAdd}>
          <span></span>
          <div className="aspect-video bg-slate-200 rounded-lg flex flex-col justify-center items-center">
            <FaPlus className="text-[3rem] text-gray-500 mb-[1rem]" />
            <h3 className="text-gray-500">EV 차량을 선택해주세요.</h3>
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
