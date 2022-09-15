export interface UserAtom {
  userId: string;
  token: string;
}

export const user: UserAtom = {
  userId: "",
  token: "",
};
