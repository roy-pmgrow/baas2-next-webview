export interface EvAtom {
  manufacturer: {
    current: string;
    values: string[];
  };
  model: {
    current: string;
    values: string[];
  };
}

export const ev: EvAtom = {
  manufacturer: {
    current: "기아",
    values: ["기아", "르노삼성", "벤츠"],
  },
  model: {
    current: "",
    values: [],
  },
};
