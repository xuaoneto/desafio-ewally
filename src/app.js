const createServer = require("./utils/server");

const PORT = 3000;
const HOSTNAME = "http://localhost";

const app = createServer(PORT, HOSTNAME);

app.listen(PORT).on("listening", () => {
  console.clear();
  console.log("Server is running on:", `${HOSTNAME}:${PORT}`);
});
