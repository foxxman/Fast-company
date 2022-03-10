import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import { httpAuth } from "../hooks/useAuth";
import localStorageService, { setTokens } from "./localStorage.service";

const http = axios.create({
  baseURL: configFile.apiEndPoint
});

// axios.interceptors.request.use(
//   function (config) {
//     console.log(config.url);
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

http.interceptors.request.use(
  async function (config) {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
      const refreshToken = localStorageService.getRefreshToken();
      const expiresDate = localStorageService.getTokenExpiresDate();

      if (refreshToken && expiresDate < Date.now()) {
        const { data } = await httpAuth.post("token", {
          grant_type: "refresh_token",
          refresh_token: refreshToken
        });

        setTokens({
          idToken: data.id_token,
          refreshToken: data.refresh_token,
          expiresIn: data.expires_in,
          localId: data.user_id
        });
      }
      const accessToken = localStorageService.getAccessToken();
      if (accessToken)
        config.params = {
          ...config.params,
          auth: accessToken
        };
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function transformData(data) {
  return data && !data._id
    ? Object.keys(data).map((key) => ({ ...data[key] }))
    : data;
}

http.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) res.data = { content: transformData(res.data) };
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      console.log(error);
      toast.error("Something was wrong. Try later.");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  put: http.put,
  delete: http.delete,
  post: http.post
};

export default httpService;
