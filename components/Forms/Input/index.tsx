import { useAtom } from "jotai";
import cloneDeep from "lodash.clonedeep";
import { FC } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { appAtom } from "store";
import { AddressType } from "types/enum";

interface Props {
  type?: AddressType;
  [key: string]: any;
}

const Input: FC<Props> = ({ type, register, watch, setValue, ...rest }) => {
  const [app, setApp] = useAtom(appAtom);

  return (
    <div className="p-3 bg-gray-100 rounded-lg flex items-center">
      <input {...register} {...rest} className="bg-gray-100 w-full" />
      {watch && (
        <IoMdCloseCircle
          className="text-[1.5rem] cursor-pointer text-gray-500"
          onClick={() => {
            if (type && type === AddressType.source) app.source = { ...app.source, bdNm: "", address: "" };
            else if (type && type === AddressType.destination)
              app.destination = { ...app.destination, bdNm: "", address: "" };
            type && setApp(cloneDeep(app));
            setValue(register.name, "");
          }}
        />
      )}
    </div>
  );
};

export default Input;
