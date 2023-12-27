import { api, getTokenBE } from "./../../utils/helper";
import config from "./../../config/config.dev.json";

export function listCategory() {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(config.BASE_BE_API, "get", "/api/category", {}, headers);
}

export function createCategory(data) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(config.BASE_BE_API, "post", "/api/category/create", data, headers);
}

export function deleteCategory(id) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(
    config.BASE_BE_API,
    "post",
    `/api/category/${id}/delete`,
    {},
    headers
  );
}

export function showCategory(id) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(
    config.BASE_BE_API,
    "get",
    `/api/category/${id}/show`,
    {},
    headers
  );
}

export function updateCategory(id, data) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(
    config.BASE_BE_API,
    "post",
    `/api/category/${id}/update`,
    data,
    headers
  );
}
