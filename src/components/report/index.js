import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import SummaryProvider from "../../context/SummaryContext";
import GeneralBoards from "./boards/GeneralBoards";
import Chart from "./charts/Chart";

const Country = () => {
  let { country } = useParams();

  const { Countries: countriesSummary } = useContext(SummaryProvider);

  const countrySummary = countriesSummary.find(
    (countrySummary) => countrySummary.CountryCode === country
  );
  console.log(`Country Summary of ${country}`, countrySummary);

  //country not found
  if (!countrySummary) {
    return (
      <div className="error-message">
        <h2>Ops! Country not found!</h2>
      </div>
    );
  }

  const title = countrySummary.Country && (
    <div className="country-headers text-center py-2">
      <h3 className="text-capitalize">{countrySummary.Country}</h3>
    </div>
  );

  const boards = (
    <div className="boards-wrapper px-2">
      <GeneralBoards country={countrySummary} />
      <Chart countryCode={countrySummary.CountryCode} />
    </div>
  );

  return (
    <div className="container-fluid">
      {title}
      {boards}
    </div>
  );
};

export default Country;
