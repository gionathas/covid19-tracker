import React, { useState, useContext } from "react";
import ReactMapGL, { Layer, Source } from "react-map-gl";
import SummaryProvider from "../../context/SummaryContext";
import { useEffect } from "react";
import AllCountries from "../../data/countries";
import * as moment from "moment";
import AreaPopup from "./AreaPopup";

const calculateCircleRadiusOfCases = (cases) => {
  return Math.ceil(Math.pow(cases, 1 / 4)) + 1;
};

const generateGeoJsonFromSummaryData = (summary) => {
  //generate geoJson Feature for each country
  const features = summary.map((countrySummary) => {
    const country = AllCountries.find(
      (item) => item.ISO === countrySummary.CountryCode
    );

    if (country) {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [country.longitude, country.latitude],
        },
        properties: {
          radius: calculateCircleRadiusOfCases(countrySummary.TotalConfirmed),
          ...countrySummary,
        },
      };
    }
  });

  //return geoJson Template
  return {
    type: "FeatureCollection",
    features: features.filter((el) => el != null),
  };
};

const LiveMap = () => {
  const summary = useContext(SummaryProvider);
  const [geoJson, setGeoJson] = useState({});
  const [visibleCountryPopup, setVisibleCountryPopup] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 0,
    longitude: 0,
    zoom: 1,
  });

  //evrey time summary changes update geoJson data
  useEffect(() => {
    setGeoJson(generateGeoJsonFromSummaryData(summary));
  }, [summary]);

  const handleClick = (e) => {
    console.log(e);
    const coordinates = e.features[0].geometry.coordinates.slice();
    const properties = e.features[0].properties;

    //click on circle case
    if (coordinates.length === 2 && properties) {
      console.log(properties);
      setVisibleCountryPopup(
        <AreaPopup
          coordinates={coordinates}
          properties={properties}
          handleClose={() => setVisibleCountryPopup(null)}
        />
      );
    }
  };

  //show last update time in top left corner
  const lastUpdate = summary && summary.length > 0 && (
    <div className="px-3">
      <small> Last update: {moment(summary[0].Date).format("LLLL")}</small>
    </div>
  );

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/gionatha/ck8vnz7z4245o1irlljunxewf"
      onViewportChange={setViewport}
      onClick={handleClick}
    >
      {lastUpdate}
      {geoJson && (
        <Source id="data" type="geojson" data={geoJson}>
          <Layer
            id="point"
            type="circle"
            paint={{
              "circle-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                1,
                ["get", "radius"],
                20,
                ["*", 6, ["get", "radius"]],
              ],
              "circle-color": "#e60f0f",
              "circle-opacity": 0.7,
            }}
          />
        </Source>
      )}
      {visibleCountryPopup}
    </ReactMapGL>
  );
};

export default LiveMap;
