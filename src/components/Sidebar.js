import React, { useState, useEffect } from "react";
import Sidebar from "react-sidebar";
import Content from "./sidebar/SidebarContent";

const mql = window.matchMedia(`(min-width: 800px)`);
const toggleButtonStyle = {
  position: "absolute",
  top: "0",
  left: "0",
  zIndex: 1,
  backgroundColor: "#343a40",
  color: "white",
  border: "none",
  borderRadius: "10%",
  opacity: 0.8,
  padding: "5px 10px",
  margin: "6px 4px",
};

const ResponsiveSidebar = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [docked, setDocked] = useState(mql.matches);

  const onMediaQueryChange = () => {
    setDocked(mql.matches);
    setOpen(false);
  };

  const toggleSidebarOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    mql.addListener(onMediaQueryChange);
    return () => {
      mql.removeListener(onMediaQueryChange);
    };
  }, []);

  const toggleSidebarButton = !docked && (
    <button style={toggleButtonStyle} onClick={toggleSidebarOpen}>
      <strong>Menu</strong>
    </button>
  );

  return (
    <Sidebar
      sidebar={<Content onLeafItemClick={() => setOpen(false)} />}
      open={open}
      docked={docked}
      onSetOpen={setOpen}
    >
      {toggleSidebarButton}
      {children}
    </Sidebar>
  );
};

export default ResponsiveSidebar;
