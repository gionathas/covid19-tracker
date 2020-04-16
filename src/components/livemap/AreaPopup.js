import React from "react";
import { Popup } from "react-map-gl";
import "./map.css";

const AreaPopup = ({ coordinates, properties, handleClose }) => (
  <Popup
    className="country-popup"
    longitude={coordinates[0]}
    latitude={coordinates[1]}
    onClose={handleClose}
  >
    <div className="bg-dark rounded border border-dark mt-2 p-2">
      <strong>{properties.Country}</strong>
      <small className="d-block">
        Confirmed:{" "}
        <strong className="text-danger">{properties.TotalConfirmed}</strong>
      </small>
      <small className="d-block">
        Deaths:{" "}
        <strong className="text-warning">{properties.TotalDeaths}</strong>
      </small>
      <small className="d-block">
        Recovered:{" "}
        <strong className="text-warning">{properties.TotalRecovered}</strong>
      </small>
    </div>
  </Popup>
);

export default AreaPopup;
