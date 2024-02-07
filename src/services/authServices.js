import http from "./httpServices";
import config from "./config.json";

export const postLogin = (values) => {
  return http.post(`${config.local}/api/v1/auth/login`, values, {
    timeout: 30000,
  });
};
