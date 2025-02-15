import { io } from "socket.io-client";
import BASEURL from "../utils/BaseUrl";

class SocketService {
  constructor() {
    this.socket = io(BASEURL, { transports: ["websocket"] });
  }

  connect(userId) {
    if (userId) {
      this.socket.emit("joinRoom", userId);
    }
  }

  sendNotification(data) {
    this.socket.emit("sendNotification", data);
  }

  listenForNotifications(data) {
    this.socket.on("receiveNotification", data);
  }

  disconnect() {
    this.socket.off("receiveNotification");
  }
}

export default new SocketService();