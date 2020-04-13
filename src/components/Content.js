import React, { useContext } from "react";
import LiveMap from "./livemap";
import Country from "./country";
import { Switch, Route } from "react-router-dom";
import SummaryProvider from "../context/SummaryContext"

const Content = () => {
  return (
    <div className="content container-fluid p-0">
      <Switch>
        <Route path="/livemap" children={<LiveMap />} />
        <Route path="/country/:country" children={<Country />} />
      </Switch>
    </div>
  );
};

export default Content;
