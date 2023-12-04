import { api } from "./../../utils/helper";
import config from "./../../config/config.dev.json";

export function allStore() {
  const headers = {
    Authorization: ``,
  };

  return api(config.BASE_BE_API, "get", "/api/customer/store/all", {}, headers);
}