import clientService from "../client-service";
export const authService = {
  signIn(data) {
    return clientService.post("/auth/sign-in", data);
  },
  signUp(data) {
    return clientService.post("/auth/sign-up", data);
  },
  checkToken(token) {
    return clientService.post("/auth/checkToken", token, {
      headers: {
        token,
      },
    });
  },
};
