import { api, getTokenBE } from "./../../utils/helper";
import config from "./../../config/config.dev.json";

export function listStore() {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(config.BASE_BE_API, "get", "/api/store", {}, headers);
}
