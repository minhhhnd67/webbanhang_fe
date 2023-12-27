import { api } from "@/utils/helper";
import config from "@/config/config.dev.json";

export function paymentVNPAY(data) {
  const headers = {
    Authorization: ``,
  };

  return api(config.BASE_BE_API, "post", "/api/payment/vnpay", data, headers);
}
