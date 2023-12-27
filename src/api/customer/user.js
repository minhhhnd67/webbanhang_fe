import { api, getTokenBE } from "./../../utils/helper";
import config from "./../../config/config.dev.json";

export function listUser(parameters) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(config.BASE_BE_API, "get", "/api/user", {}, headers, parameters);
}

export function createUser(data) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(config.BASE_BE_API, "post", "/api/user/create", data, headers);
}

export function showUser(id) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(config.BASE_BE_API, "get", `/api/user/${id}/show`, {}, headers);
}

export function updateUser(id, data) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(
    config.BASE_BE_API,
    "post",
    `/api/user/${id}/update`,
    data,
    headers
  );
}

export function deleteUser(id) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(config.BASE_BE_API, "post", `/api/user/${id}/delete`, {}, headers);
}
