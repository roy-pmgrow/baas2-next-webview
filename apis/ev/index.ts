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
  /** 나의 EV 차량 조회 */
  myList(loginId: string) {
    return httpRequest.post("/app/user/getMyEvList", {
      data: {
        user_id: loginId,
      },
    });
  },
  /** 나의 EV 차량 등록/수정/삭제 */
  myCar(loginId: string, evId: string, type: MyCarOptions) {
    return httpRequest.post("/app/user/getMyEvList", {
      data: {
        user_id: loginId,
        ev_id: evId,
        proc_type: type,
      },
    });
  },
};

export default evApi;
