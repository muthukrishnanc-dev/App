const Tasks = require("../models/tasks");
const mongoose = require("mongoose");
exports.tasks = async (req, res) => {
  const userId = req.user;
  const { task, isComplete, isEdit } = req.body;
  if (!task.trim()) {
    return res.status(400).json({ message: "provide valid task" });
  }
  try {
    const newTask = await Tasks.create({ userId, task, isComplete, isEdit });
    return res.status(200).json({ newtask: newTask, message: "Task Created" });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "You have already have same task " });
    }
    res.status(500).json({ error: "server error" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Tasks.find({ userId: id });
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = req.params.id;
    // console.log(task);
    // console.log(mongoose.Types.ObjectId.isValid(task));
    const deletedTask = await Tasks.findByIdAndDelete(task);
    res.json(deletedTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Cannot delete task" });
  }
};

exports.updateTask = async (req, res) => {
  const { editText, isEdit } = req.body;
  try {
    if (!editText.trim()) {
      return res.status(400).json({message:"you can not update empty task"})
    }
    const updatedTask = await Tasks.findByIdAndUpdate(
      req.params.id,
      { task: editText, isEdit: isEdit, isCompleted: false },
      { new: true },
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "task not found" });
    }
    console.log(updatedTask);
    return res.json(updatedTask);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Cannot delete task" });
  }
};

exports.patchUpdate = async (req, res) => {
  const userId = req.params.id;
  const { isCompleted } = req.body;
  try {
    const updatedTask = await Tasks.findByIdAndUpdate(
      userId,
      { isCompleted: !isCompleted },
      { new: true },
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Oops! Update failed" });
  }
};
// cmk888@gmail.com
