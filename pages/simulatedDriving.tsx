import addressApi from "apis/address";
import Section from "layouts/Section";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { KakaoNaviRoads } from "types/response/kakaonavi";

const SimulatedDrivingPage: NextPage = () => {
  const [naviData, setNaviData] = useState([]);
  useEffect(() => {
    const data: any = [];
    addressApi
      .kakaoNavi("127.016990589902, 37.2798597422117", "127.11377087536, 37.1575880574755")
      .then(({ routes }) => {
        const { sections } = routes[0];
        const { roads } = sections[0];
        console.log(roads);
        roads.map(({ distance, duration, traffic_speed, traffic_state, vertexes }: KakaoNaviRoads) => {
          const points = [];
          for (let i = 0; i < vertexes.length; i += 2) {
            const point = {
              lng: vertexes[i],
              lat: vertexes[i + 1],
            };
            points.push(point);
          }
          const road = {
            distance,
            duration,
            traffic_speed,
            traffic_state,
            points,
          };
          data.push(road);
        });
        setNaviData(data);
        console.log(naviData);
      })
      .catch((err) => {});
  }, []);

  return (
    <Section>
      <span className="text-sm text-gray-500">자동 모의 주행</span>
      <div className="w-full h-[48rem]">
        <Map
          className="rounded-lg"
          center={{ lat: 37.2798597422117, lng: 127.016990589902 }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "100%",
          }}
          level={8} // 지도의 확대 레벨
          mapTypeId={1}
        >
          <MapMarker
            position={{ lat: 37.2798597422117, lng: 127.016990589902 }}
            image={{
              src: "/images/map/marker-source.png",
              size: {
                width: 30,
                height: 43,
              },
            }}
          />
          <MapMarker
            position={{ lat: 37.1575880574755, lng: 127.11377087536 }}
            image={{
              src: "/images/map/marker-destination.png",
              size: {
                width: 30,
                height: 43,
              },
            }}
          />

          <MapMarker
            position={{ lat: 37.2798597422117, lng: 127.016990589902 }}
            image={{
              src: "/images/map/marker-car.png",
              size: {
                width: 40,
                height: 40,
              },
            }}
          />

          {naviData &&
            naviData.map(({ points }, index) => (
              <Polyline
                key={index}
                path={[points]}
                strokeWeight={5} // 선의 두께 입니다
                strokeColor={"#FF0000"} // 선의 색깔입니다
                strokeOpacity={1} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle={"solid"} // 선의 스타일입니다
              />
            ))}
        </Map>
      </div>
    </Section>
  );
};

export default SimulatedDrivingPage;
