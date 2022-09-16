/* eslint-disable react/jsx-no-undef */
import BottomButton from "components/Forms/BottomButton";
import DropDown from "components/Forms/DropDown";
import useQueryEvList from "hooks/queries/useQueryEvList";
import { useAtom } from "jotai";
import Section from "layouts/Section";
import cloneDeep from "lodash.clonedeep";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { evAtom } from "store";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ResponseEV } from "types/response";

const EVAdd: NextPage = () => {
  const [ev, setEv] = useAtom(evAtom);
  const { isLoading, data, filterData } = useQueryEvList();
  const [evCar, setEvCar] = useState<ResponseEV>();

  const handleSelectedManufacturer = (name: string, index: number) => {
    ev.manufacturer.current = name;
    setEv(cloneDeep(ev));
  };

  const handleSelectedModel = (name: string, index: number) => {
    ev.model.current = name;
    setEv(cloneDeep(ev));
  };

  useEffect(() => {
    if (filterData) setEvCar(filterData[0]);
  }, [filterData]);

  console.log(ev.model.values);
  return (
    <Section>
      <div className="flex space-x-[0.5rem]">
        {ev.manufacturer.values.length !== 0 && (
          <DropDown
            current={ev.manufacturer.current}
            list={ev.manufacturer.values}
            onClick={handleSelectedManufacturer}
          />
        )}
        {ev.model.values.length !== 0 && (
          <DropDown current={ev.model.current} list={ev.model.values} onClick={handleSelectedModel} />
        )}
      </div>
      <h3 className="mt-[0.5rem] ml-[0.2rem] text-gray-500 relative top-3 text-sm font-semibold">
        시리즈/모델명
      </h3>
      <Swiper
        className="mt-[1rem]"
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={({ activeIndex }) => {
          setEvCar(filterData[activeIndex]);
          ev.model.current = filterData[activeIndex].ev_detl_model;
          setEv(cloneDeep(ev));
        }}
        onSwiper={(swiper) => console.log(swiper)}
        pagination={true}
        modules={[Pagination]}
      >
        {filterData.map(({ ev_id, ev_detl_model, ev_img }: ResponseEV) => (
          <SwiperSlide key={ev_id} className="cursor-pointer">
            <div className="aspect-video">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${ev_img}`}
                alt={ev_detl_model}
                layout="fill"
                className="rounded-lg border select-none"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <h3 className="mt-[2rem] ml-[0.2rem] text-gray-500 relative top-3 text-sm font-semibold">차량스펙</h3>
      <div className="flex flex-col mt-[1.5rem] p-[1rem] bg-gray-100 rounded-lg space-y-[1rem] text-sm">
        <div className="flex justify-between">
          <span className="w-[10rem] text-gray-600">모델명</span>
          <span className="w-full">{evCar?.ev_detl_model}</span>
        </div>
        <div className="flex justify-between">
          <span className="w-[10rem] text-gray-600">전비</span>
          <span className="w-full">{evCar?.m_pcr} kwh</span>
        </div>
        <div className="flex justify-between">
          <span className="w-[10rem] text-gray-600">주행거리</span>
          <span className="w-full">{evCar?.m_mileage} km</span>
        </div>
        <div className="flex justify-between">
          <span className="w-[10rem] text-gray-600">배터리 용량</span>
          <span className="w-full">{evCar?.bat_pow} kwh</span>
        </div>
        <div className="flex justify-between">
          <span className="w-[10rem] text-gray-600">배터리 제조사</span>
          <span className="w-full">{evCar?.bat_mnfct}</span>
        </div>
        <BottomButton>선택하기</BottomButton>
      </div>
    </Section>
  );
};

export default EVAdd;
