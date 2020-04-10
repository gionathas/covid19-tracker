import React from "react";
import { Line } from "react-chartjs-2";
import useAxios from "axios-hooks";
import * as moment from "moment";
import "./chart.css";
import config from "../../../config";

const ConfirmedChart = ({ slug }) => {
  //api for fetching data
  const [
    { data: confirmed, loading: loadingConfirmed, error: errorConfirmed },
  ] = useAxios(
    `${config.API_BASE_URL}/total/dayone/country/${slug}/status/confirmed`
  );
  const [
    { data: recovered, loading: loadingRecovered, error: errorRecovered },
  ] = useAxios(
    `${config.API_BASE_URL}/total/dayone/country/${slug}/status/recovered`
  );
  const [
    { data: deaths, loading: loadingDeaths, error: errorDeaths },
  ] = useAxios(
    `${config.API_BASE_URL}/total/dayone/country/${slug}/status/deaths`
  );

  const isDataReady = confirmed && recovered && deaths;

  const lineChart = isDataReady ? (
    <Line
      data={{
        labels: confirmed.map((item) => moment(item.Date)),
        datasets: [
          {
            data: confirmed.map((item) => item.Cases),
            label: "Infected",
            borderColor: "red",
            fill: true,
          },
          {
            data: recovered.map((item) => item.Cases),
            label: "Recovered",
            borderColor: "yellow",
            fill: true,
          },
          {
            data: deaths.map((item) => item.Cases),
            label: "Deaths",
            borderColor: "grey",
            fill: true,
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        legend: {
          display: true,
        },
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "month",
              },
            },
          ],
        },
      }}
    />
  ) : null;

  return (
    <div className="container-fluid p-0 mt-4 text-center">
      {loadingConfirmed || loadingDeaths || loadingRecovered ? (
        <h6>Loading Chart..</h6>
      ) : errorConfirmed || errorDeaths || errorRecovered ? (
        <h6>Error Loading Chart..</h6>
      ) : (
        <div className="chart">{lineChart}</div>
      )}
    </div>
  );
};

export default ConfirmedChart;
