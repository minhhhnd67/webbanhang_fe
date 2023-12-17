import { api } from "./../../utils/helper";
import config from "./../../config/config.dev.json";


export function createOrder(data) {
  const headers = {
    Authorization: ``,
  };

  return api(config.BASE_BE_API, "post", "/api/customer/order/store", data, headers);
}

export function updateOrder(id, data) {
  const headers = {
    Authorization: ``,
  };

  return api(
    config.BASE_BE_API,
    "post",
    `/api/customer/order/${id}/update`,
    data,
    headers
  );
}
