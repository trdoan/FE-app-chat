import clientService from "../client-service";
export const roomServices = {
  findAll() {
    return clientService.get("/room");
  },
  create(data) {
    return clientService.post("/room", data);
  },
};
