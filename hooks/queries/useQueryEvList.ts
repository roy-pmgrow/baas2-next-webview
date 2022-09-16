import evApi from "apis/ev";
import { useAtom } from "jotai";
import cloneDeep from "lodash.clonedeep";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { evAtom } from "store";
import { ResponseEV } from "./../../types/response/index";

const useQueryEvList = () => {
  const [ev, setEv] = useAtom(evAtom);
  const { isLoading, data } = useQuery(["evList", ev.manufacturer.current], evApi.list);
  const [filterData, setFilterData] = useState<ResponseEV[]>([]);

  const setManufacturer = (data: ResponseEV[]) => {
    const set = new Set();
    data.filter(({ ev_mnfct }: ResponseEV) => {
      set.add(ev_mnfct);
    });
    ev.manufacturer.values = [...set] as string[];
    setEv(cloneDeep(ev));
  };

  const setFilter = (data: ResponseEV[]) => {
    const filter = data.filter(({ ev_mnfct }: ResponseEV) => ev_mnfct === ev.manufacturer.current);
    setModel(filter);
    setFilterData(filter);
  };

  const setModel = (data: ResponseEV[]) => {
    const array: string[] = [];
    data.filter(({ ev_detl_model, m_mileage }: ResponseEV) => {
      array.push(`${ev_detl_model} (${m_mileage} km)`);
    });
    ev.model.values = array;
    ev.model.current = ev.model.values[0];
    setEv(cloneDeep(ev));
  };

  useEffect(() => {
    if (data) {
      setManufacturer(data);
      setFilter(data);
    }
  }, [data]);
  return { isLoading, data, filterData };
};

export default useQueryEvList;
