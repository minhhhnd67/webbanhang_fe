import { api, getTokenBE } from "./../../utils/helper";
import config from "./../../config/config.dev.json";

export function register(data) {
  return api(config.BASE_BE_API, "post", "/api/register", data);
}

export function loginGoogle() {
  return api(config.BASE_BE_API, "post", "/api/get-google-sign-in-url");
}

export function login(data) {
  return api(config.BASE_BE_API, "post", "/api/login", data);
}

export function me() {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(config.BASE_BE_API, "get", "/api/me", {}, headers);
}

export function logout() {
  const headers = {
    Authorization: `Bearer ${getTokenBE()}`,
  };

  return api(config.BASE_BE_API, "post", "/api/logout", {}, headers);
}
