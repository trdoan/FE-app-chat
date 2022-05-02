import clientService from "../client-service";

export const userService = {
  update(data) {
    const token = localStorage.getItem("token");
    return clientService.put("/user/profileUpdate", data, {
      headers: {
        token: token,
      },
    });
  },
};
