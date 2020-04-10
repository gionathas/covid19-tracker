import React from "react";
import "./sidebar.css";
import Nav from "react-bootstrap/Nav";

const Sidebar = ({ title, className, children }) => {
  return (
    <div className={`sidebar ${className}`}>
      <div className="sidebar-brand">
        <h4>{title}</h4>
      </div>

      <hr className="sidebar-divider" />

      <Nav as="ul" className="flex-columns">
        {children}
      </Nav>
    </div>
  );
};

export default Sidebar;
