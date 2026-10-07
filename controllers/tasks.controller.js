const asyncWrapper = require("../middleware/asyncWrapper");
const Task = require("../models/task.model");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../middleware/appError");

//  -----create task ----
const createTask = asyncWrapper(async (req, res) => {
  const { title, description } = req.body;

  const newTask = new Task({
    title,
    description,
    user: req.user._id,
  });
  await newTask.save();
  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { task: newTask } });
});
// ====create task====

// ----- get all task ----
const getTasks = asyncWrapper(async (req, res) => {
  const query = req.query;

  const limit = +query.limit || 8;
  const page = +query.page || 1;
  const skip = (page - 1) * limit;

  let filter = { user: req.user._id };
  if (req.query.status) {
    filter.status = req.query.status;
  }

  if (req.query.search) {
    const cleanSearch = req.query.search.toString().trim();
    filter.title = new RegExp(cleanSearch, "i");
  }

  const tasks = await Task.find(filter, { __v: false })
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });
  return res.json({ status: httpStatusText.SUCCESS, data: { tasks } });
});
// ==== get all task====

//  ----update task ------
const updateTask = asyncWrapper(async (req, res, next) => {
  const id = req.params.taskId;
  const editTask = await Task.findOneAndUpdate(
    { _id: id, user: req.user._id },
    req.body,
    { new: true },
  );
  if (!editTask) {
    const error = appError.create("task not found", httpStatusText.FAIL, 404);
    return next(error);
  }
  return res.json({
    status: httpStatusText.SUCCESS,
    data: { task: editTask },
  });
});
// ====update task =====

// ----detele task-----
const deleteTask = asyncWrapper(async (req, res, next) => {
  const id = req.params.taskId;
  const reTask = await Task.findOneAndDelete({ _id: id, user: req.user._id });
  if (!reTask) {
    const error = appError.create("task not found", httpStatusText.FAIL, 404);
    return next(error);
  }
  return res.json({ status: httpStatusText.SUCCESS, data: null });
});
// ==== delete task ====

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
