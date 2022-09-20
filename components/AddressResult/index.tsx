import Modal from "components/Modal";
import PreviewMap, { PreviewMapContent } from "components/PreviewMap";
import { useAtom } from "jotai";
import cloneDeep from "lodash.clonedeep";
import { FC, MouseEvent, useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { appAtom, modalAtom } from "store";
import { AddressType } from "types/enum";
import { ResponseAddress } from "types/response";

interface Props {
  type: AddressType;
  data: ResponseAddress[];
  handleClick: () => void;
}

const AddressResult: FC<Props> = ({ type, data, handleClick }) => {
  const [app, setApp] = useAtom(appAtom);
  const [modal, setModal] = useAtom(modalAtom);
  const [content, setContent] = useState<PreviewMapContent>({ name: "", address: "", lat: 0, lng: 0 });

  const handleSelected = async (content: PreviewMapContent) => {
    const { name, address, lat, lng } = content;
    if (type === AddressType.source)
      app.source = { ...app.source, name, address, location: { lat, lng }, isSearch: false };
    else if (type === AddressType.destination)
      app.destination = { ...app.destination, name, address, location: { lat, lng }, isSearch: false };
    setApp(cloneDeep(app));
    handleClick();
  };

  const handlePreview = (event: MouseEvent<HTMLButtonElement>, content: PreviewMapContent) => {
    event.stopPropagation();
    setContent(content);
    modal.show();
    setModal(cloneDeep(modal));
  };

  const handleClose = () => {
    modal.hide();
    setModal(cloneDeep(modal));
  };

  return (
    <>
      {data.length > 0 && (
        <section className="max-h-[18rem] overflow-y-auto rounded-lg">
          <span className="text-sm font-semibold ml-2 mb-1">검색 결과</span>
          <div className="bg-gray-100 rounded-lg select-none">
            {data.map(({ id, place_name, road_address_name, x, y }: ResponseAddress) => (
              <div
                key={id}
                className="p-3 text-sm text-gray-700 flex items-center justify-between hover:bg-gray-200 rounded-lg"
                onClick={() =>
                  handleSelected({
                    name: place_name,
                    address: road_address_name,
                    lat: Number(y),
                    lng: Number(x),
                  })
                }
              >
                <div className="flex mr-2">
                  <HiLocationMarker className="text-[1.5rem] mr-2" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{place_name}</span>
                    <span className="text-xs text-gray-500">{road_address_name}</span>
                  </div>
                </div>
                <button
                  className="min-w-[5rem] bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                  onClick={(event) =>
                    handlePreview(event, {
                      name: place_name,
                      address: road_address_name,
                      lat: Number(y),
                      lng: Number(x),
                    })
                  }
                >
                  위치 확인
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
      {modal.toggle && (
        <Modal handleClose={handleClose}>
          <PreviewMap content={content} handleSelected={() => handleSelected(content)} />
        </Modal>
      )}
    </>
  );
};

export default AddressResult;
