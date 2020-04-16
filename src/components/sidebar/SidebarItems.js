import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Nav from "react-bootstrap/Nav";
import Collapse from "react-bootstrap/Collapse";

export const NodeSidebarItem = ({ text, icon, children, isOpen = false }) => {
  const [open, setOpen] = useState(isOpen);

  return (
    <>
      <Nav.Item
        as="li"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        <div className="d-flex justify-content-between align-items-center">
          <span>
            {icon}
            {text}
          </span>
          <FontAwesomeIcon icon={open ? faAngleDown : faAngleRight} />
        </div>
      </Nav.Item>

      <Collapse in={open}>
        <div className="subitems pl-3">{children}</div>
      </Collapse>
    </>
  );
};

export const LeafSidebarItem = ({ link, text, icon, onClick }) => {
  return (
    <Nav.Item as="li">
      <NavLink
        to={link}
        className="text-decoration-none"
        activeStyle={{
          fontWeight: 800,
        }}
        onClick={onClick}
      >
        {icon}
        {text}
      </NavLink>
    </Nav.Item>
  );
};
