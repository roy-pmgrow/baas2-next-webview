import { httpRequest } from "./../httpRequest";
const evApi = {
  list() {
    return httpRequest.post("/app/manage/getEvList", {});
  },
};

export default evApi;
