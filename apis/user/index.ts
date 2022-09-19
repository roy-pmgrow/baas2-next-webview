import { httpRequest } from "./../httpRequest";
const userApi = {
  /** 로그인 */
  login(loginId: string, password: string, saved: boolean, keeped: boolean) {
    return httpRequest.post("/app/auth/login", {
      data: {
        user_id: loginId,
        user_pw: password,
        prstnt_yn: keeped ? "Y" : "N",
        id_save_yn: saved ? "Y" : "N",
      },
    });
  },
  /** 로그아웃 */
  logout(loginId: string) {
    return httpRequest.post("/app/auth/logout", {
      data: {
        user_id: loginId, //
      },
    });
  },
  /** 회원가입 */
  signup(loginId: string, password: string) {
    return httpRequest.post("/app/user/regUser", {
      data: {
        user_id: loginId, //
        user_pw: password,
      },
    });
  },
  /** 아이디 중복체크 */
  idCheck(loginId: string) {
    return httpRequest.post("/app/auth/idCheck", {
      data: {
        user_id: loginId, //
      },
    });
  },
};

export default userApi;
