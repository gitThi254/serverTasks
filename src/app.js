const express = require("express");
const globalHandlerError = require("./controllers/err.controller");
const CustomError = require("./Utils/CustomError");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const authRoutes = require("./routes/auth.routes");
const tasksRoutes = require("./routes/tasks.routes");

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.URL_CLIENT,
    credentials: true,
  })
);

app.use("/api/v1/users", authRoutes);
app.use("/api/v1/tasks", tasksRoutes);

app.all("*", (req, res, next) =>
  next(new CustomError(`Can't not find ${req.originalUrl} on the server`, 404))
);

app.use(globalHandlerError);

module.exports = app;
