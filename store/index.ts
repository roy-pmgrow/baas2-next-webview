import { atom } from "jotai";
import { focusAtom } from "jotai/optics";
import { app } from "./atom/app";

export const rootAtom = atom({
  app,
});

export const appAtom = focusAtom(rootAtom, (root) => root.prop("app"));
