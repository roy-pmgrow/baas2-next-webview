import { httpRequest } from "./../httpRequest";
const userApi = {
  login(loginId: string, password: string, saved: boolean, keeped: boolean) {
    return httpRequest.post("/api/login", {
      data: {
        user_id: loginId,
        user_pw: password,
        prstnt_yn: keeped ? "Y" : "N",
        id_save_yn: saved ? "Y" : "N",
      },
    });
  },
  signup(loginId: string, password: string) {
    return httpRequest.post("/app/user/regUser", {
      data: {
        user_id: loginId, //
        user_pw: password,
      },
    });
  },
  idCheck(loginId: string) {
    return httpRequest.post("/app/auth/idCheck", {
      data: {
        user_id: loginId, //
      },
    });
  },
};

export default userApi;
