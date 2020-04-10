import React from "react";
import Sidebar from "./sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Country from "./country";
import { LeafSidebarItem, NodeSidebarItem } from "./sidebar/SidebarItems";
import { faMap, faGlobeAfrica } from "@fortawesome/free-solid-svg-icons";
import countries from "../data/countries.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "react-bootstrap/Spinner";
import useAxios from "axios-hooks";
import config from "../config";
import { SummaryProvider } from "../context/SummaryContext";

const renderSpinner = () => {
  return (
    <div className="main-loader-wrapper">
      <Spinner className="spinner" animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

const App = () => {
  const [{ data: summary, loading, error }] = useAxios(
    `${config.API_BASE_URL}/summary`
  );

  if (loading) return renderSpinner();
  if (error) return <p>Error!</p>;
  return (
    <SummaryProvider value={summary.Countries}>
      <Router>
        <div className="container-fluid p-0">
          <div className="d-flex justify-content-between">
            <Sidebar title="Covid-19 Tracker" className="bg-dark">
              <LeafSidebarItem
                text="Live Map"
                link="/livemap"
                icon={<FontAwesomeIcon icon={faMap} className="mr-2" />}
              />
              <NodeSidebarItem
                text="Countries"
                icon={<FontAwesomeIcon icon={faGlobeAfrica} className="mr-2" />}
                isOpen={true}
              >
                <small className="text-muted">Main Countries</small>
                {countries.MAIN_COUNTRIES.map((country) => {
                  return (
                    <LeafSidebarItem
                      key={country.Slug}
                      text={country.Country}
                      link={`/${country.Slug}`}
                    />
                  );
                })}
                <hr />
                <small className="text-muted">Other Countries</small>
                {countries.OTHER_COUNTRIES.map((country, index) => {
                  return (
                    <LeafSidebarItem
                      key={country.Slug}
                      text={country.Country}
                      link={`/${country.Slug}`}
                    />
                  );
                })}
              </NodeSidebarItem>
            </Sidebar>
            <Switch>
              <Route path="/:country" children={<Country />} />
            </Switch>
          </div>
        </div>
      </Router>
    </SummaryProvider>
  );
};

export default App;
