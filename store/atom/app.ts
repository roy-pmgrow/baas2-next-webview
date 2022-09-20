export interface Info {
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  isSearch: boolean;
}

export interface AppAtom {
  source: Info;
  destination: Info;
}

export const app: AppAtom = {
  source: {
    name: "",
    address: "",
    location: {
      lat: 0,
      lng: 0,
    },
    isSearch: false,
  },
  destination: {
    name: "",
    address: "",
    location: {
      lat: 0,
      lng: 0,
    },
    isSearch: false,
  },
};
