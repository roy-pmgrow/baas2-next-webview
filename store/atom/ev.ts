export interface EvAtom {
  manufacturer: {
    index: number;
    current: string;
    values: string[];
  };
  model: {
    index: number;
    current: string;
    values: string[];
  };
  refresh: Date;
}

export const ev: EvAtom = {
  manufacturer: {
    index: 0,
    current: "기아",
    values: ["기아", "르노삼성", "벤츠"],
  },
  model: {
    index: 0,
    current: "",
    values: [],
  },
  refresh: new Date(),
};
