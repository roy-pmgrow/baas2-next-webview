export interface Info {
  bdNm: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface AppAtom {
  source: Info;
  destination: Info;
}

export const app: AppAtom = {
  source: {
    bdNm: "",
    address: "",
    location: {
      lat: 0,
      lng: 0,
    },
  },
  destination: {
    bdNm: "",
    address: "",
    location: {
      lat: 0,
      lng: 0,
    },
  },
};
