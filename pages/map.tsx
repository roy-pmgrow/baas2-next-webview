import addressApi from "apis/address";
import Button from "components/Forms/Button";
import Section from "layouts/Section";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapPage: NextPage = () => {
  const { query } = useRouter();
  const { keyword, address } = query;

  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);

  useEffect(() => {
    addressApi
      .kakaoMap(address as string)
      .then((result) => {
        const { documents } = result;
        const { x: lng, y: lat } = documents[0];
        console.log(lat, lng);
        setLat(lat);
        setLng(lng);
      })
      .catch((err) => {});
  }, []);

  return (
    <Section>
      <div className="ml-1">
        <h1 className="text-xl font-semibold">{keyword}</h1>
        <h3 className="text-sm text-gray-500">{address}</h3>
      </div>
      <div className="w-full h-[30rem] mb-[1rem]">
        <Map
          className="rounded-lg"
          center={{ lat, lng }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "100%",
          }}
          level={5} // 지도의 확대 레벨
          mapTypeId={1}
        >
          <MapMarker position={{ lat, lng }} />
        </Map>
      </div>
      <Button>선택하기</Button>
    </Section>
  );
};

export default MapPage;
