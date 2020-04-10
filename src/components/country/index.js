import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import SummaryProvider from "../../context/SummaryContext";
import GeneralBoards from "./boards/GeneralBoards";
import Chart from "./boards/Chart";
import * as moment from "moment";

const Country = () => {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { country } = useParams();
  const summary = useContext(SummaryProvider);

  const countrySummary = summary.find((item) => item.Slug === country);
  console.log(`Country Summary of ${country}`, countrySummary);

  //country not found in summaries
  if (!countrySummary) {
    return (
      <div className="error-message">
        <h2>Ops! Country not found!</h2>
      </div>
    );
  }

  return (
    <div className="container-fluid content">
      <div className="text-sm-center text-md-left ">
        <small> Last update: {moment(countrySummary.Date).fromNow()}</small>
      </div>
      <div className="country-headers text-center py-2">
        <h3 className="text-capitalize">{country}</h3>
      </div>
      <div className="boards-wrapper px-2">
        <GeneralBoards country={countrySummary} />
        <Chart slug={countrySummary.Slug} />
      </div>
    </div>
  );
};

export default Country;
