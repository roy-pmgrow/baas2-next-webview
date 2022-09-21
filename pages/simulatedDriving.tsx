import addressApi from "apis/address";
import { useAtom } from "jotai";
import Section from "layouts/Section";
import cloneDeep from "lodash.clonedeep";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { appAtom } from "store";
import { KakaoNaviRoads } from "types/response/kakaonavi";

const SimulatedDrivingPage: NextPage = () => {
  const { query } = useRouter();
  const { slat, slng, dlat, dlng } = query;
  const [app, setApp] = useAtom(appAtom);

  const [timer, setTimer] = useState<NodeJS.Timer>();

  const [naviData, setNaviData] = useState([]);
  const [testData, setTestData] = useState([]);
  const [carLocation, setCarLocation] = useState({ lat: 0, lng: 0 });

  const getKakaoNavi = async (origin: string, destination: string) => {
    const data = await addressApi.kakaoNavi(origin, destination);
    if (data) {
      const { result_code, sections } = data.routes[0];
      // 성공
      if (result_code === 0) {
        const filterRoads: any = [];
        const testRoads: any = [];
        const { roads } = sections[0];
        roads.map(
          ({ distance, duration, traffic_speed, traffic_state, vertexes }: KakaoNaviRoads, index: number) => {
            const points = [];
            for (let i = 0; i < vertexes.length; i += 2) {
              points.push({ lng: vertexes[i], lat: vertexes[i + 1] });
            }
            filterRoads.push({ distance, duration, traffic_speed, traffic_state, points });
            if (index <= 10) {
              testRoads.push({ distance, duration, traffic_speed, traffic_state, points });
            }
          },
        );
        setNaviData(filterRoads);
        setTestData(testRoads);
      }
      // 실패
      else {
      }
    }
  };

  const traceTheRoute = () => {
    const interval = setInterval(() => {
      console.log("Test");
    }, 1000);
    setTimer(interval);
  };

  useEffect(() => {
    traceTheRoute();
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (slat && slng && dlat && dlng) {
      const sourceLocation = { lat: Number(slat), lng: Number(slng) };
      const destinationLocation = { lat: Number(dlat), lng: Number(dlng) };
      const origin = `${slng},${slat}`;
      const destination = `${dlng},${dlat}`;
      app.source = { ...app.source, location: sourceLocation };
      app.destination = { ...app.destination, location: destinationLocation };
      setApp(cloneDeep(app));
      // 차량 초기 위치 설정
      setCarLocation({ lat: Number(slat), lng: Number(slng) });
      getKakaoNavi(origin, destination);
    }
  }, [slat, slng, dlat, dlng]);

  return (
    <Section>
      <div className="w-full h-[48rem]">
        <Map
          className="rounded-lg"
          center={{ lat: app.source.location.lat, lng: app.source.location.lng }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "100%",
          }}
          level={8} // 지도의 확대 레벨
          mapTypeId={1}
        >
          <MapMarker
            position={{ lat: app.source.location.lat, lng: app.source.location.lng }}
            image={{
              src: "/images/map/marker-source.png",
              size: {
                width: 30,
                height: 43,
              },
            }}
          />
          <MapMarker
            position={{ lat: app.destination.location.lat, lng: app.destination.location.lng }}
            image={{
              src: "/images/map/marker-destination.png",
              size: {
                width: 30,
                height: 43,
              },
            }}
          />

          <MapMarker
            position={{ lat: carLocation.lat, lng: carLocation.lng }}
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
                strokeWeight={5}
                strokeColor={"#FF0000"}
                strokeOpacity={1}
                strokeStyle={"solid"}
              />
            ))}

          {testData &&
            testData.map(({ points }, index) => (
              <Polyline
                key={index}
                path={[points]}
                strokeWeight={5}
                strokeColor={"#0000FF"}
                strokeOpacity={1}
                strokeStyle={"solid"}
              />
            ))}
        </Map>
      </div>
    </Section>
  );
};

export default SimulatedDrivingPage;
