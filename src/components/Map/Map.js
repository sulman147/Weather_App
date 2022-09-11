import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.scss";
import temperature from "../../resources/temperature.png";

function Map({ MapLocation }) {
  const position = [MapLocation.latitude, MapLocation.longitude];
  const unitSymbol = MapLocation.unit === "metric" ? "C" : "F";
  let temperatureIcon;
  temperatureIcon = L.icon({
    iconUrl: temperature,
    iconSize: [38, 95], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76],
  });
  return (
    <div className="mapcontainer">
      <label className="title">MAP Of Current Location</label>
      <br />
      <label className="subtitle">
        {MapLocation.locality} , {MapLocation.country} | {MapLocation.temp} °
        {unitSymbol}
      </label>
      <div className="leaflet-container">
        <MapContainer className="map" center={position} zoom={13}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position} icon={temperatureIcon}>
            <Popup>
              Temperature of {MapLocation.locality} , {MapLocation.country} is{" "}
              {MapLocation.temp}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;
