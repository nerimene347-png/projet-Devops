const app = require("./src/app");
const connectDB = require("./src/config/db");
const { port } = require("./src/config/env");

async function start() {
  await connectDB();
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(
      `🚀 API OneTech Business Solution démarrée sur http://localhost:${port}/api`,
    );
  });
}

start();

process.on("unhandledRejection", (err) => {
  // eslint-disable-next-line no-console
  console.error("Unhandled rejection :", err);
});
