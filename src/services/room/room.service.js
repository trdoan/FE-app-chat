import clientService from "../client-service";
export const roomServices = {
  findAll() {
    return clientService.get("/room");
  },
  create(data) {
    return clientService.post("/room", data);
  },
  delete(id) {
    return clientService.delete(`/room/delete/${id}`, {
      headers: { token: localStorage.getItem("token") },
    });
  },
};
