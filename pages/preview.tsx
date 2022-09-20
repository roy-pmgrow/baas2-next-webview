import addressApi from "apis/address";
import Button from "components/Forms/Button";
import { useAtom } from "jotai";
import Section from "layouts/Section";
import cloneDeep from "lodash.clonedeep";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { appAtom } from "store";
import { AddressType } from "types/enum";

const PreviewPage: NextPage = () => {
  const { query, back } = useRouter();
  const { type } = query;
  const bdNm = query.bdNm as string;
  const address = query.address as string;

  const [app, setApp] = useAtom(appAtom);

  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);

  const handleSelected = () => {
    if (type === AddressType.source) app.source = { ...app.source, bdNm, address, location: { lat, lng } };
    else if (type === AddressType.destination)
      app.destination = { ...app.destination, bdNm, address, location: { lat, lng } };
    setApp(cloneDeep(app));
    back();
  };

  const getAddressLatLn = async (address: string) => {
    const data = await addressApi.kakaoMap(address);
    if (data) {
      const { documents } = data;
      const { x: lng, y: lat } = documents[0];
      setLat(lat);
      setLng(lng);
    }
  };

  useEffect(() => {
    getAddressLatLn(address as string);
  }, []);

  return (
    <Section>
      <div className="ml-1 mb-2">
        <h1 className="text-xl font-semibold">{bdNm}</h1>
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
      <Button onClick={handleSelected}>선택하기</Button>
    </Section>
  );
};

export default PreviewPage;
