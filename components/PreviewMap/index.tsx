import Button from "components/Forms/Button";
import { FC } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export interface PreviewMapContent {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

interface Props {
  content: PreviewMapContent;
  handleSelected: () => void;
}

const PreviewMap: FC<Props> = ({ content: { name, address, lat, lng }, handleSelected }) => {
  return (
    <article className="text-left">
      <div className="ml-1 mb-2">
        <h1 className="text-xl font-semibold">{name}</h1>
        <h3 className="text-sm text-gray-500">{address}</h3>
      </div>
      <div className="w-full h-[20rem] mb-[1rem]">
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
    </article>
  );
};

export default PreviewMap;
