import React from "react";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import useAxios from "axios-hooks";
import config from "../config";
import { SummaryProvider } from "../context/SummaryContext";
import MainContent from "./MainContent";

const renderSpinner = () => {
  return (
    <div className="main-loader-wrapper">
      <Spinner className="spinner" animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

const renderError = () => {
  return <div className="error-message h3">Error! Try Reload the Page...</div>;
};

const App = () => {
  const [{ data: summary, loading, error }] = useAxios(
    `${config.API_BASE_URL}/summary`
  );

  if (loading) return renderSpinner();
  if (error) return renderError();
  return (
    <SummaryProvider value={summary}>
      <Router>
        <div className="container-fluid p-0">
          <Sidebar>
            <MainContent />
          </Sidebar>
        </div>
      </Router>
    </SummaryProvider>
  );
};

export default App;
