import { api, getTokenBE } from "./../../utils/helper";
import config from "./../../config/config.dev.json";

export function listOrder(parameters) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(
    config.BASE_BE_API,
    "get",
    "/api/order",
    {},
    headers,
    parameters
  );
}

export function createOrder(data) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(config.BASE_BE_API, "post", "/api/order/create", data, headers);
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

export function deleteOrder(id) {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(
    config.BASE_BE_API,
    "post",
    `/api/order/${id}/delete`,
    {},
    headers
  );
}
