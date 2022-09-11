import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import { EmptyLocationModel, LocationModel } from "../models";

  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
  const cityBaseUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
  const zipBaseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
  
export const useLocation = (locationName: string) => {
  const [location, setLocation] = useState<LocationModel>(EmptyLocationModel);
  const handleError = useErrorHandler();
  const getCoordsByLocationName = useCallback(
    (locationName: string) => {
      axios
        .get(
           `${cityBaseUrl}${locationName}&appid=${apiKey}`
        )
        .then((res: any) => {
          if (res.data) {
            const location = res.data[0];
            setLocation({
              position: {
                latitude: location.lat,
                longitude: location.lon,
              },
              locality: location.name,
              country: location.country,
            });
          }
        })
        .catch((error :any) => {
          handleError(error);
        });
    },
    [ handleError]
  );
  const getCoordsByZipCode = useCallback(
    (locationName: string) => {
      let arr = locationName.split(',')
      if(arr.length > 1 && arr.length < 3 ){
      axios
        .get(
           `${zipBaseUrl}${arr[0]},${arr[1]}&appid=${apiKey}`
        )
        .then((res: any) => {
          if (res.data) {
            const location = res.data;
            setLocation({
              position: {
                latitude: location.coord.lat,
                longitude: location.coord.lon,
              },
              locality: location.name,
              country: location.sys.country,
            });
          }
        })
        .catch((error :any) => {
          handleError(error);
        });
      }
    },
    [ handleError]
  );

  useEffect(() => {
    if(localStorage.getItem('mode') === 'City'){
      if (locationName === "") {
        getCoordsByLocationName("Islamabad");
      } else {
        getCoordsByLocationName(locationName);
      }
    }else {
      if (locationName === "") {
        getCoordsByZipCode("46000,pk");
      } else {
        
        getCoordsByZipCode(locationName);
      }
    }
    
  }, [getCoordsByLocationName,getCoordsByZipCode, handleError, locationName]);

  return {
    location,
  };
};
