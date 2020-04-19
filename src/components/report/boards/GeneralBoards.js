import React from "react";
import TextBoard from "./TextBoard";

const Boards = {
  CONFIMERD_CASES: {
    title: "Confirmed",
    items: [
      {
        navTitle: "Daily",
        subTitle: "New Confirmed",
        valueKey: "NewConfirmed",
      },
      {
        navTitle: "Total",
        subTitle: "Total Confirmed",
        valueKey: "TotalConfirmed",
      },
    ],
  },
  DEATHS: {
    title: "Deaths",
    items: [
      {
        navTitle: "Daily",
        subTitle: "New Deaths",
        valueKey: "NewDeaths",
      },
      {
        navTitle: "Total",
        subTitle: "Total Deaths",
        valueKey: "TotalDeaths",
      },
    ],
  },
  RECOVERED: {
    title: "Recovered",
    items: [
      {
        navTitle: "Daily",
        subTitle: "New Recovered",
        valueKey: "NewRecovered",
      },
      {
        navTitle: "Total",
        subTitle: "Total Recovered",
        valueKey: "TotalRecovered",
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
