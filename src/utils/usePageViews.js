import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ga from "react-ga";
import config from "../config";

const enabled = config.enableAnalytics;

export default () => {
  let location = useLocation();
  useEffect(() => {
    if (location && enabled) {
      console.debug(location);
      ga.pageview(location.pathname);
    }
  }, [location]);
};
