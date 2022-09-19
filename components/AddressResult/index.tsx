import { FC } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { ResponseAddress } from "types/response";

interface Props {
  data: ResponseAddress[];
  handleClick: (selected: ResponseAddress) => void;
}

const AddressResult: FC<Props> = ({ data, handleClick }) => {
  return (
    <section className="h-[18rem] overflow-y-auto rounded-lg">
      <span className="text-sm font-semibold ml-2 mb-1">검색 결과</span>
      <div className="bg-gray-100 rounded-lg select-none">
        {data.map(({ bdNm, roadAddr }: ResponseAddress) => (
          <div
            key={roadAddr}
            className="p-3 text-sm text-gray-700 flex items-center hover:bg-gray-200"
            onClick={() => handleClick({ bdNm, roadAddr })}
          >
            <HiLocationMarker className="text-[1.5rem] mr-2" />
            <div className="flex flex-col">
              <span className="text-sm">{bdNm}</span>
              <span className="text-xs text-gray-500">{roadAddr}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AddressResult;
