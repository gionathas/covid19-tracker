import React from "react";
import Sidebar from "./Sidebar";
import Spinner from "react-bootstrap/Spinner";
import useAxios from "axios-hooks";
import config from "../config";
import { SummaryProvider } from "../context/SummaryContext";
import MainContent from "./MainContent";
import ga from "react-ga";
import usePageViews from "../utils/usePageViews";

if (config.enableAnalytics) {
  console.debug("Enabling Google Analitycs...");
  ga.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
}

const App = () => {
  usePageViews();

  //get summary data from api
  const [{ data: summary, loading, error }] = useAxios(
    `${config.API_BASE_URL}/summary`
  );

  const showSpinner = () => {
    return (
      <div className="main-loader-wrapper">
        <Spinner className="spinner" animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  };

  const showErrorMessage = () => {
    return (
      <div className="error-message h3">Error! Try Reload the Page...</div>
    );
  };

  if (loading) return showSpinner();
  if (error) return showErrorMessage();
  return (
    <SummaryProvider value={summary}>
      <Sidebar>
        <MainContent />
      </Sidebar>
    </SummaryProvider>
  );
};

export default App;
