import { Server, Socket } from "socket.io";

export const configureSocketIO = (io: Server): void => {
  console.log("Init socket.io");

  io.on("connection", (socket: Socket) => {
    console.log("User connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.onAny((event: string, ...args: unknown[]) => {
      console.log(`ANY ${event}`, args);
    });
  });

  setInterval(() => {
    io.emit("test", { test: "123" });
  }, 30000);
};
