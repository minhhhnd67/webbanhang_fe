import { api, getTokenBE } from "./../../utils/helper";
import config from "./../../config/config.dev.json";

export function listStore() {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(config.BASE_BE_API, "get", "/api/store", {}, headers);
}

export function createStore(data) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(config.BASE_BE_API, "post", "/api/store/create", data, headers);
}

export function deleteStore(id) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(
    config.BASE_BE_API,
    "post",
    `/api/store/${id}/delete`,
    {},
    headers
  );
}

export function showStore(id) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(config.BASE_BE_API, "get", `/api/store/${id}/show`, {}, headers);
}

export function updateStore(id, data) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(
    config.BASE_BE_API,
    "post",
    `/api/store/${id}/update`,
    data,
    headers
  );
}
