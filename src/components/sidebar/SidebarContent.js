import React, { useContext } from "react";
import "./sidebar.css";
import Nav from "react-bootstrap/Nav";
import { faMap, faGlobeAfrica } from "@fortawesome/free-solid-svg-icons";
import AllCountries, { MainCountries } from "../../data/countries.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { LeafSidebarItem, NodeSidebarItem } from "./SidebarItems";
import * as moment from "moment";
import SummaryProvider from "../../context/SummaryContext";

const separateCountries = () => {
  const mainCountries = [];
  const otherCountries = [];

  AllCountries.forEach((country) =>
    (MainCountries.includes(country.ISO) ? mainCountries : otherCountries).push(
      country
    )
  );
  return { MAIN: mainCountries, OTHER: otherCountries };
};

const SidebarContent = ({ onLeafItemClick }) => {
  const { Countries: summary } = useContext(SummaryProvider);
  const countries = useRef(separateCountries());

  const lastUpdate = summary && summary.length > 0 && (
    <small className="subtitle">
      <i>Last Update: {moment(summary[0].Date).fromNow()}</i>
    </small>
  );

  const appVersion = process.env.REACT_APP_VERSION && (
    <small className="app-version">
      <i>v{process.env.REACT_APP_VERSION}</i>
    </small>
  );

  const CountryToSideBarItem = (country) => {
    return (
      <LeafSidebarItem
        key={country.ISO}
        text={country.name}
        onClick={onLeafItemClick}
        link={`/country/${country.ISO}`}
      />
    );
  };

  return (
    <div className={`sidebar bg-dark`}>
      <div className="sidebar-brand">
        <h4>Covid-19 Tracker</h4>
        {lastUpdate}
      </div>

      <hr className="sidebar-divider" />

      <Nav as="ul" className="flex-columns">
        <LeafSidebarItem
          text="Live Map"
          link="/livemap"
          icon={<FontAwesomeIcon icon={faMap} className="mr-2" />}
          onClick={onLeafItemClick}
        />
        <NodeSidebarItem
          text="Countries"
          icon={<FontAwesomeIcon icon={faGlobeAfrica} className="mr-2" />}
          isOpen={true}
        >
          <small className="text-muted">Main Countries</small>
          {countries.current.MAIN.map((country) =>
            CountryToSideBarItem(country)
          )}
          <hr />
          <small className="text-muted">Other Countries</small>
          {countries.current.OTHER.map((country) =>
            CountryToSideBarItem(country)
          )}
        </NodeSidebarItem>
      </Nav>
      {appVersion}
    </div>
  );
};

export default SidebarContent;
