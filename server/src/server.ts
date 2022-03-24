import app from "./app";
let server;

const PORT = app.get("port");
const ENV = app.get("env");

server = app.listen(PORT, "0.0.0.0", () => {
  console.log("Server is running at http://localhost:%d in %s mode", PORT, ENV);
});
