import evApi from "apis/ev";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { userAtom } from "store";

const useQueryMyEvList = () => {
  const [user] = useAtom(userAtom);
  const { isLoading, data } = useQuery(["myEvList"], () => evApi.myList(user.loginId), {
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
