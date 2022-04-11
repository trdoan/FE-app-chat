import clientService from "../client-service";

export const userService = {
  login(data) {
    return clientService.post("/user/signin", data);
  },
};
