import axios from "axios";

const clientService = axios.create({
  baseURL: "https://api-meet-cdtt.herokuapp.com",
});
clientService.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
clientService.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
);

export default clientService;
