import { api } from "@/utils/helper";
import config from "@/config/config.dev.json";

export function getProvinces() {
  const headers = {
    token: `${config.TOKEN_GHN}`,
    "Content-Type": "application/json",
  };

  return api(
    config.BASE_GHN_API,
    "post",
    "/shiip/public-api/master-data/province",
    {},
    headers
  );
}

export function getDistricts(province_id) {
  const headers = {
    token: `${config.TOKEN_GHN}`,
    "Content-Type": "application/json",
  };

  const data = {
    province_id: province_id,
  };

  return api(
    config.BASE_GHN_API,
    "post",
    "/shiip/public-api/master-data/district",
    data,
    headers
  );
}

export function getWards(district_id) {
  const headers = {
    token: `${config.TOKEN_GHN}`,
    "Content-Type": "application/json",
  };

  const data = {
    district_id: district_id,
  };

  return api(
    config.BASE_GHN_API,
    "post",
    "/shiip/public-api/master-data/ward",
    data,
    headers
  );
}

export function calculateFeeShip(data) {
  const headers = {
    "Token": `${config.TOKEN_GHN}`,
    "Content-Type": "application/json",
    "ShopId": `${config.ShopId}`
  };

  return api(config.BASE_GHN_API, "post", "/shiip/public-api/v2/shipping-order/preview", data, headers);
}

export function createOrderShip(data) {
  const headers = {
    "Token": `${config.TOKEN_GHN}`,
    "Content-Type": "application/json",
    "ShopId": `${config.ShopId}`
  };

  return api(config.BASE_GHN_API, "post", "/shiip/public-api/v2/shipping-order/create", data, headers);
}
