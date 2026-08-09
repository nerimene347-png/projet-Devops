const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");

const { corsOrigin, env } = require("./config/env");
const routes = require("./routes");
const { errorHandler, notFound } = require("./middlewares/error.middleware");

const app = express();

app.use(helmet());
app.use(cors({ origin: "http://localhost:5175", credentials: true }));
app.use(compression());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

if (env !== "test") {
  app.use(morgan(env === "production" ? "combined" : "dev"));
}

app.get("/health", (req, res) =>
  res.json({ status: "ok", uptime: process.uptime() }),
);

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
