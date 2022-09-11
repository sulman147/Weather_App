
export interface LocationModel {
  position: {
    latitude: number;
    longitude: number;
  };
  country: string;
  locality: string;
}

export const EmptyLocationModel = {
  position: {
    latitude: 0,
    longitude: 0,
  },
  country: "",
  locality: "",
};
