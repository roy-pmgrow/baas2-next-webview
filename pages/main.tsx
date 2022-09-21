import addressApi from "apis/address";
import AddressResult from "components/AddressResult";
import Button from "components/Forms/Button";
import Input from "components/Forms/Input";
import useQueryMyEvList from "hooks/queries/useQueryMyEvList";
import { useAtom } from "jotai";
import Section from "layouts/Section";
import cloneDeep from "lodash.clonedeep";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { appAtom } from "store";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { AddressType } from "types/enum";
import { AddressForm } from "types/forms/address";
import { ResponseAddress, ResponseEV } from "types/response";

interface Location {
  lat: string;
  lng: string;
}

const MainPage: NextPage = () => {
  const [app, setApp] = useAtom(appAtom);
  const { register, watch, setValue } = useForm<AddressForm>({
    mode: "onChange",
  });
  const { push } = useRouter();
  const { data } = useQueryMyEvList();
  const [sources, setSources] = useState<ResponseAddress[]>([]);
  const [destinations, setDestinations] = useState<ResponseAddress[]>([]);

  const handleAdd = () => {
    push("/ev/add");
  };

  const searchAddress = async (type: AddressType, keyword: string) => {
    if (keyword === "") {
      setSources([]);
      setDestinations([]);
      return;
    }

    const data = await addressApi.kakaoMap(keyword);
    if (data) {
      if (type === AddressType.source) {
        setSources(data.documents);
        setDestinations([]);
      } else if (type === AddressType.destination) {
        setSources([]);
        setDestinations(data.documents);
      }
    }
  };

  const handlePreview = () => {
    push({
      pathname: "/simulatedDriving",
      query: {
        slat: app.source.location.lat,
        slng: app.source.location.lng,
        dlat: app.destination.location.lat,
        dlng: app.destination.location.lng,
      },
    });
  };

  useEffect(() => {
    if (app.source.isSearch) searchAddress(AddressType.source, watch("source"));
  }, [watch("source")]);

  useEffect(() => {
    if (app.destination.isSearch) searchAddress(AddressType.destination, watch("destination"));
  }, [watch("destination")]);

  useEffect(() => {
    setValue("source", app.source.name);
    setValue("destination", app.destination.name);
  }, []);

  return (
    <Section>
      <Swiper
        className="relative"
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
              <div className="relative aspect-video max-w-full min-h-[12.5rem] mt-[0.5rem]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${ev_img}`}
                  alt={ev_detl_model}
                  className="select-none rounded-lg"
                  layout="fill"
                />
              </div>
            </SwiperSlide>
          ))}
        <SwiperSlide className="cursor-pointer" onClick={handleAdd}>
          <span className="mr-2 px-1 py-0.5 text-xs text-gray-500">EV차량</span>
          <div className="aspect-video min-h-[12.5rem] bg-slate-200 rounded-lg flex flex-col justify-center items-center mt-[0.5rem]">
            <FaPlus className="text-[3rem] text-gray-500 mb-[1rem]" />
            <h3 className="text-gray-500">차량을 선택해주세요.</h3>
          </div>
        </SwiperSlide>
      </Swiper>
      <article className="flex flex-col space-y-[1rem]">
        <Input
          register={register("source")}
          watch={watch("source")}
          placeholder="출발지 검색"
          onFocus={() => (app.source.isSearch = true)}
          onClear={() => {
            app.source = { ...app.source, name: "", address: "", location: { lat: 0, lng: 0 } };
            setApp(cloneDeep(app));
            setValue("source", "");
          }}
        />
        <AddressResult
          type={AddressType.source}
          data={sources}
          handleClick={() => {
            setValue("source", app.source.name);
            setSources([]);
          }}
        />
        <Input
          register={register("destination")}
          watch={watch("destination")}
          placeholder="도착지 검색"
          onFocus={() => (app.destination.isSearch = true)}
          onClear={() => {
            app.destination = { ...app.destination, name: "", address: "", location: { lat: 0, lng: 0 } };
            setApp(cloneDeep(app));
            setValue("destination", "");
          }}
        />
        {destinations.length > 0 && (
          <AddressResult
            type={AddressType.destination}
            data={destinations}
            handleClick={() => {
              setValue("destination", app.destination.name);
              setDestinations([]);
            }}
          />
        )}
      </article>
      <div className="flex space-x-[1rem] mt-[3rem]">
        <Button className="bg-amber-500" onClick={handlePreview}>
          자동 모의주행
        </Button>
        <Button>시뮬레이션</Button>
      </div>
    </Section>
  );
};

export default MainPage;
