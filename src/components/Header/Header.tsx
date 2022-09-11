import React from "react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CurrentWeatherModel, SettingsModel } from "../../models";
import "./Header.scss";
import Select from 'react-select';

type HeaderProps = {
  locality?: string;
  country?: string;
  data: CurrentWeatherModel;
  settings: SettingsModel;
  changeSettings: (newSettings: object) => void;
  changeLocation: (location: string) => void;
};

export const Header = ({
  locality,
  country,
  data,
  settings,
  changeSettings,
  changeLocation,
}: HeaderProps) => {
  const getFormatedDate = () => {
    const selectedDate = new Date(data.dt * 1000);
    var date = selectedDate.toLocaleString("en-GB", {
      day: "numeric",
      weekday: "long",
      month: "long",
    });
    var year = selectedDate.toLocaleString("en-GB", {
      year: "numeric",
    });
    var hour = selectedDate.toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${date} ${year} ${hour}`;
  };
  
  const changeserch = [
    { label: "City", value: 1 },
    { label: "Zip Code", value: 2 },
  ];

  return (
    <>
      <div className="location">
        <label className="city">{locality}</label>
        <label className="country">{country}</label>
        <label className="date">{getFormatedDate()}</label>
      </div>
      <div className="settings">
        <div className="units">
          <span
            className={settings.unit === "metric" ? "active" : ""}
            onClick={() => {
              changeSettings({ unit: "metric" });
            }}
          >
            <button>Convert to °C</button>
          </span>
          <span
            className={settings.unit !== "metric" ? "active" : ""}
            onClick={() => {
              changeSettings({ unit: "imperial" });
            }}
          >
            <button>Convert to °F</button>
          </span>
        </div>
        <div
          className="button-theme"
          onClick={() => {
            if (settings.theme === "dark") changeSettings({ theme: "light" });
            else changeSettings({ theme: "dark" });
          }}
        >
          <FontAwesomeIcon
            icon={settings.theme === "dark" ? faSun : faMoon}
          ></FontAwesomeIcon>
        </div>
      </div>
      <div className="search">
        <input
          className="input"
          placeholder="Enter your location"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              changeLocation(e.currentTarget.value);
            }
          }}
        ></input>
        <div className="option">
        <Select  options={ changeserch } placeholder={localStorage.getItem('mode')} onChange={(e:any)=>localStorage.setItem("mode", e.label)} />
        </div>
      </div>
      
    </>
  );
};

export default Header;
