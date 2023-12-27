import { api } from "./../../utils/helper";
import config from "./../../config/config.dev.json";

export function allCategory() {
  const headers = {
    Authorization: ``,
  };

  return api(config.BASE_BE_API, "get", "/api/customer/category/all", {}, headers);
}

export function showCategory(id) {
  const headers = {
    Authorization: ``,
  };

  return api(
    config.BASE_BE_API,
    "get",
    `/api/customer/category/${id}/detail`,
    {},
    headers
  );
}
