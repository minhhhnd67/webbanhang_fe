import { api, getTokenBE } from "./../../utils/helper";
import config from "./../../config/config.dev.json";

export function listProduct(parameters) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(
    config.BASE_BE_API,
    "get",
    "/api/product",
    {},
    headers,
    parameters
  );
}

export function allProduct(parameters) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(
    config.BASE_BE_API,
    "get",
    "/api/product/all",
    {},
    headers,
    parameters
  );
}

export function createProduct(data) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(config.BASE_BE_API, "post", "/api/product/create", data, headers);
}

export function showProduct(id) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(config.BASE_BE_API, "get", `/api/product/${id}/show`, {}, headers);
}

export function updateProduct(id, data) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(
    config.BASE_BE_API,
    "post",
    `/api/product/${id}/update`,
    data,
    headers
  );
}

export function deleteProduct(id) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(
    config.BASE_BE_API,
    "post",
    `/api/product/${id}/delete`,
    {},
    headers
  );
}
