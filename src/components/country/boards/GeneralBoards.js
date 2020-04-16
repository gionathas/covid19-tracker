import React from "react";
import TextBoard from "./TextBoard";

const Boards = {
  CONFIMERD_CASES: {
    title: "Confirmed",
    items: [
      {
        navTitle: "Total",
        subTitle: "Total Confirmed",
        valueKey: "TotalConfirmed",
      },
      {
        navTitle: "Daily",
        subTitle: "New Confirmed",
        valueKey: "NewConfirmed",
      },
    ],
  },
  DEATHS: {
    title: "Deaths",
    items: [
      {
        navTitle: "Total",
        subTitle: "Total Deaths",
        valueKey: "TotalDeaths",
      },
      {
        navTitle: "Daily",
        subTitle: "New Deaths",
        valueKey: "NewDeaths",
      },
    ],
  },
  RECOVERED: {
    title: "Recovered",
    items: [
      {
        navTitle: "Total",
        subTitle: "Total Recovered",
        valueKey: "TotalRecovered",
      },
      {
        navTitle: "Daily",
        subTitle: "New Recovered",
        valueKey: "NewRecovered",
      },
    ],
  },
};

const GeneralBoards = ({ country }) => {
  return (
    <div className="row">
      {Object.keys(Boards).map((key) => {
        const board = Boards[key];
        return (
          <div key={board.title} className="col-md-4 mt-2">
            <TextBoard
              title={board.title}
              items={board.items.map((item) => {
                return {
                  ...item,
                  value: country[item.valueKey],
                };
              })}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GeneralBoards;
