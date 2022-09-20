import addressApi from "apis/address";
import Section from "layouts/Section";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapPage: NextPage = () => {
  const { query } = useRouter();
  const { keyword } = query;
  console.log(keyword);

  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);

  useEffect(() => {
    addressApi
      .kakaoMap(keyword as string)
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
      <span className="text-sm text-gray-500">{keyword}</span>
      <div className="w-full h-[48rem]">
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
          <MapMarker
            position={{ lat, lng }}
            image={{
              src: "/images/map/marker-select.png",
              size: {
                width: 50,
                height: 50,
              },
            }}
          />
        </Map>
      </div>
    </Section>
  );
};

export default MapPage;
