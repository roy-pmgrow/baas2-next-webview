import { httpRequest } from "./../httpRequest";
const userApi = {
  login(loginId: string, password: string) {
    return httpRequest.post("/api/login", { loginId, password });
  },
};

export default userApi;
