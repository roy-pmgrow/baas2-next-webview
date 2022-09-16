export interface UserAtom {
  loginId: string;
  token: string;
}

export const user: UserAtom = {
  loginId: "",
  token: "",
};
