import axios from "axios";

const clientService = axios.create({
  baseURL: "http://localhost:5001",
});
clientService.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
clientService.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    //console.log("error", error.response.data);
    return Promise.reject(error.response.data);
  }
);

export default clientService;
