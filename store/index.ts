import { atom } from "jotai";
import { focusAtom } from "jotai/optics";
import { ev } from "./atom/ev";
import { modal } from "./atom/modal";
import { user } from "./atom/user";

export const rootAtom = atom({
  modal,
  user,
  ev,
});

export const modalAtom = focusAtom(rootAtom, (root) => root.prop("modal"));
export const userAtom = focusAtom(rootAtom, (root) => root.prop("user"));
export const evAtom = focusAtom(rootAtom, (root) => root.prop("ev"));
