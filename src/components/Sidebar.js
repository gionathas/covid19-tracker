import React from "react";
import { LeafSidebarItem, NodeSidebarItem } from "./sidebar/SidebarItems";
import SideBar from "./sidebar/Sidebar";
import { faMap, faGlobeAfrica } from "@fortawesome/free-solid-svg-icons";
import AllCountries, { MainCountries } from "../data/countries.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

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

const Sidebar = () => {
  const countries = useRef(separateCountries());

  const CountryToSideBarItem = (country) => {
    return (
      <LeafSidebarItem
        key={country.ISO}
        text={country.name}
        link={`/country/${country.ISO}`}
      />
    );
  };

  return (
    <SideBar title="Covid-19 Tracker" className="bg-dark">
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
        {countries.current.MAIN.map((country) => CountryToSideBarItem(country))}
        <hr />
        <small className="text-muted">Other Countries</small>
        {countries.current.OTHER.map((country) =>
          CountryToSideBarItem(country)
        )}
      </NodeSidebarItem>
    </SideBar>
  );
};

export default Sidebar;
