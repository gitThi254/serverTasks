const CustomError = require("../Utils/CustomError");
const asyncHandlerError = require("../Utils/asyncHandlerError");
const Task = require("../models/tasks.model");

exports.createTasks = asyncHandlerError(async (req, res, next) => {
  const newTask = await Task.create({ ...req.body, user: req.user.id });
  res.status(201).json({
    data: newTask,
  });
});

exports.getTasks = asyncHandlerError(async (req, res, next) => {
  const tasks = await Task.find({ user: req.user.id });
  res.status(200).json({
    data: tasks,
  });
});

exports.getTask = asyncHandlerError(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task)
    return next(
      new CustomError(`Task with id: ${req.params.id} not found`, 404)
    );
  res.status(200).json({
    data: task,
  });
});

exports.deleteTask = asyncHandlerError(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task)
    return next(
      new CustomError(`Task with id: ${req.params.id} not found`, 404)
    );
  res.status(200).json({
    data: task,
  });
});

exports.updateTask = asyncHandlerError(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators,
  });
  if (!task)
    return next(
      new CustomError(`Task with id: ${req.params.id} not found`, 404)
    );
  res.status(200).json({
    data: task,
  });
});
