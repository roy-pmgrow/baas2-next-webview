import { useRouter } from "next/router";
import { FC } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { ResponseAddress } from "types/response";

interface Props {
  data: ResponseAddress[];
  handleClick: (bdNm: string) => void;
}

const AddressResult: FC<Props> = ({ data, handleClick }) => {
  const { push } = useRouter();
  const handleMap = (keyword: string) => {
    push({
      pathname: "/map",
      query: { keyword },
    });
  };

  return (
    <section className="h-[18rem] overflow-y-auto rounded-lg">
      <span className="text-sm font-semibold ml-2 mb-1">검색 결과</span>
      <div className="bg-gray-100 rounded-lg select-none">
        {data.map(({ bdNm, roadAddr, roadAddrPart1, roadAddrPart2 }: ResponseAddress) => (
          <div
            key={roadAddr}
            className="p-3 text-sm text-gray-700 flex items-center justify-between hover:bg-gray-200"
            onClick={() => handleClick(bdNm)}
          >
            <div className="flex mr-2">
              <HiLocationMarker className="text-[1.5rem] mr-2" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{bdNm}</span>
                <span className="text-xs text-gray-500">{roadAddrPart1}</span>
                <span className="text-xs text-gray-500">{roadAddrPart2}</span>
              </div>
            </div>
            <button
              className="min-w-[5rem] bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
              onClick={() => handleMap(bdNm)}
            >
              위치 확인
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AddressResult;
