import { api } from "./../../utils/helper";
import config from "./../../config/config.dev.json";

export function getNewProductByStore(store_id, parameters = {}) {
  const headers = {
    Authorization: ``,
  };

  return api(config.BASE_BE_API, "get", `/api/customer/store/${store_id}/get-new-product`, {}, headers, parameters);
}

export function showProduct(id) {
    const headers = {
        Authorization: ``,
    };

    return api(config.BASE_BE_API, "get", `/api/customer/product/${id}/detail`, {}, headers);
}