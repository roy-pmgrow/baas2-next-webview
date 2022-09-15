import { atom } from "jotai";
import { focusAtom } from "jotai/optics";
import { app } from "./atom/app";
import { modal } from "./atom/modal";

export const rootAtom = atom({
  app,
  modal,
});

export const appAtom = focusAtom(rootAtom, (root) => root.prop("app"));
export const modalAtom = focusAtom(rootAtom, (root) => root.prop("modal"));
