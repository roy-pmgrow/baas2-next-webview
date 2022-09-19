import evApi from "apis/ev";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { evAtom, userAtom } from "store";

const useQueryMyEvList = () => {
  const [user] = useAtom(userAtom);
  const [ev] = useAtom(evAtom);
  const { isLoading, data } = useQuery(["myEvList", ev.refresh], () => evApi.myList(user.loginId), {
    enabled: user.loginId !== "",
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  return { isLoading, data };
};

export default useQueryMyEvList;
