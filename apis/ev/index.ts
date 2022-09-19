import { httpRequest } from "./../httpRequest";

export const enum MyCarOptions {
  add = "R",
  update = "U",
  delete = "D",
}

const evApi = {
  /** EV 차량 조회 */
  list() {
    return httpRequest.post("/app/manage/getEvList", {});
  },
  /** 나의 EV 차량 조회
   *
   * @param loginId 로그인 아이디
   *
   * */
  myList(loginId: string) {
    return httpRequest.post("/app/user/getMyEvList", {
      data: {
        user_id: loginId,
      },
    });
  },
  /**
   * 나의 EV 차량 등록/수정/삭제
   *
   * @param loginId 로그인 아이디
   * @param evId 차량 아이디
   * @param type 등록(R)/수정(U)/삭제(D)
   *
   * */
  myCar(loginId: string, evId: string, type: MyCarOptions) {
    return httpRequest.post("/app/user/regEvFavorite", {
      data: {
        user_id: loginId,
        ev_id: evId,
        proc_type: type,
      },
    });
  },
};

export default evApi;
