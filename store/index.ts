import { atom } from "jotai";
import { focusAtom } from "jotai/optics";
import { app } from "./atom/app";
import { modal } from "./atom/modal";
import { user } from "./atom/user";

export const rootAtom = atom({
  app,
  modal,
  user,
});

export const appAtom = focusAtom(rootAtom, (root) => root.prop("app"));
export const modalAtom = focusAtom(rootAtom, (root) => root.prop("modal"));
export const userAtom = focusAtom(rootAtom, (root) => root.prop("user"));
