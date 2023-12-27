import { api, getTokenBE } from "./../../utils/helper";
import config from "./../../config/config.dev.json";

export function getTotalOrderByDate(parameters) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(
    config.BASE_BE_API,
    "get",
    "/api/statistic/get-total-order-by-date",
    {},
    headers,
    parameters
  );
}

export function getDataForLineChart(parameters) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(
    config.BASE_BE_API,
    "get",
    "/api/statistic/get-data-for-line-chart",
    {},
    headers,
    parameters
  );
}
