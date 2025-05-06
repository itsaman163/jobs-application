import axios from "axios";
import { toast } from "react-toastify";
import { getSession } from "./auth";
import { API_END_POINT } from "../config";

export const successMsg = (message) =>
  toast.success(message, {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
  });

export const errorMsg = (message) =>
  toast.error(message, {
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
  });

export const apiRequest = async (apiUrl, apiSetting = {}) => {
  try {
    // debugger
    const targetUrl = API_END_POINT + apiUrl;
    // "Access-Control-Allow-Origin": "*",
    axios.defaults.baseURL = API_END_POINT;
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded;multipart/form-data";
    axios.defaults.headers.get["Content-Type"] =
      "application/json;charset=UTF-8";
    axios.defaults.timeout = 1000 * 60; // Wait for 60 seconds
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const method = apiSetting.method ? apiSetting.method : "GET";
    const apiParams = apiSetting.apiParams ? apiSetting.apiParams : {};

    const headerObj = {};
    const axiosConfig = {
      cancelToken: source.token,
    };
    const loginInfo = getSession();
    const authToken = loginInfo ? loginInfo : null;

    if (authToken) {
      headerObj["token_type"] = authToken.token_type;
      headerObj["Authorization"] = "Bearer " + authToken.token;
    }

    if (apiSetting.headers && apiSetting.headers.lenght > 0) {
      for (const [hk, hv] of Object.entries(apiSetting.headers)) {
        headerObj[hk] = hv;
      }
    }
    if (Object.keys(headerObj).length > 0) {
      axiosConfig["headers"] = headerObj;
    }

    if (method === "POST") {
      let formData = new FormData();
      for (const [key, value] of Object.entries(apiParams)) {
        formData.append(key, value);
      }
      //loop on file input key's array
      const api_response = await axios.post(targetUrl, formData, axiosConfig);

      return api_response["data"];
    }
    else if (method === "PATCH") {
      let formData = new FormData();
      for (const [key, value] of Object.entries(apiParams)) {
        formData.append(key, value);
      }
      const api_response = await axios.patch(targetUrl, axiosConfig);

      return api_response["data"];
    } else {
      axiosConfig["params"] = apiParams;
      const api_response = await axios.get(targetUrl, axiosConfig);

      return api_response["data"];
    }
  } catch (error) {
    console.log(error);
    // return error?.response;
  }
}

export const apiRequestV1 = async (apiUrl, apiParams) => {
  try {
    const targetUrl = API_END_POINT + apiUrl;
    const method = apiParams.method;
    const data = apiParams.apiParams;

    const loginInfo = getSession();
    console.log(loginInfo);
    const authToken = loginInfo ? loginInfo : null;


    const Authorization = "Bearer " + authToken.token;

    let config = {
      method: method,
      maxBodyLength: Infinity,
      url: targetUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Authorization
      },
      data: JSON.stringify(data)
    };
    const result = await axios.request(config);
    return result.data
  } catch (err) {
    return { setting: { success: false, massage: err.response.data.msg } }
  }
}
