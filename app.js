require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
 
const url = process.env.MONGO_URL

mongoose.connect(url).then(() => {
  console.log("connected with DB successfully");
});

const app = express();
app.use(express.json());

const httpStatusText = require("./utils/httpStatusText");

const usersRouter = require("./routes/users.route");
const tasksRouter = require("./routes/tasks.route");

app.use("/api/users", usersRouter);
app.use("/api/tasks", tasksRouter);

app.use("/uploads", express.static("uploads"))

app.use((req, res, next) => {
  return res
    .status(404)
    .json({ status: httpStatusText.FAIL, message: "this resource not found" });
});

app.use((error, req, res, next) => {
  return res
    .status(error.statusCode || 500)
    .json({
      status: error.statusText || httpStatusText.ERROR,
      message: error.message,
      data: null,
      code: error.statusCode || 500,
    });
});

app.listen(process.env.PORT || 4000, () => {
  console.log("server is started on port 4000");
});
 