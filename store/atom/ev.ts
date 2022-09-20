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
    current: "",
    values: [],
  },
  model: {
    index: 0,
    current: "",
    values: [],
  },
  refresh: new Date(),
};
