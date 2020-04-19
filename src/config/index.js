import _ from "lodash";

const config = {
  development: {
    API_BASE_URL: "https://api.covid19api.com",
    mock_enabled: true,
    enableAnalytics: false,
  },
  production: {
    mock_enabled: false,
    enableAnalytics: true,
  },
};

const defaultConfig = config.development;
const environment = process.env.NODE_ENV || "development";
const environmentConfig = config[environment];
export default _.merge(defaultConfig, environmentConfig);
