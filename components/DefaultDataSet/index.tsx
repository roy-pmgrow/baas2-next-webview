import { useAtom } from "jotai";
import jwtDecode from "jwt-decode";
import cloneDeep from "lodash.clonedeep";
import { useEffect } from "react";
import { userAtom } from "store";

const DefaultDataSet = () => {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (localStorage && localStorage.token) {
      const decoded = jwtDecode(localStorage.token) as any;
      user.token = localStorage.token;
      user.loginId = decoded.user_id;
      setUser(cloneDeep(user));
    }
  }, []);

  return null;
};

export default DefaultDataSet;
