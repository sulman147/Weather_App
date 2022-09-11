export interface MapLocationModel {
  latitude: number;
  longitude: number;
  country: string;
  locality: string;
  temp:number
  unit:string
}

export const EmptyMapLocation = {
    latitude: 0,
    longitude: 0,
    country: "",
    locality: "",
    temp: 0,
    unit:"metric"
};

