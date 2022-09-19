import { FC } from "react";
import { HiLocationMarker } from "react-icons/hi";

const SearchResult: FC = () => {
  return (
    <section>
      <span className="text-sm font-semibold ml-2 mb-1">검색 결과</span>
      <div className="bg-gray-100 rounded-lg">
        <div className="p-3 text-sm text-gray-700 flex items-center">
          <HiLocationMarker className="text-[1.5rem] mr-2" />
          <div className="flex flex-col">
            <span className="text-sm">카닥일산주유소</span>
            <span className="text-xs text-gray-500">경기도 고양시 일산동구 백마로 54</span>
          </div>
        </div>
        <div className="p-3 text-sm text-gray-700 flex items-center">
          <HiLocationMarker className="text-[1.5rem] mr-2" />
          <div className="flex flex-col">
            <span className="text-sm">카닥일산주유소</span>
            <span className="text-xs text-gray-500">경기도 고양시 일산동구 백마로 54</span>
          </div>
        </div>
        <div className="p-3 text-sm text-gray-700 flex items-center">
          <HiLocationMarker className="text-[1.5rem] mr-2" />
          <div className="flex flex-col">
            <span className="text-sm">카닥일산주유소</span>
            <span className="text-xs text-gray-500">경기도 고양시 일산동구 백마로 54</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
