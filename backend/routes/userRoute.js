const express = require("express");
const { profile } = require("../controllers/authController");
const { protected } = require("../middleware/authMiddleware");
const {
  tasks,
  getTasks,
  deleteTask,
  updateTask,
  patchUpdate,
} = require("../controllers/taskController");
const router = express.Router();
router.get("/profile", protected, profile);
router.post("/tasks", protected, tasks);
router.get("/:id", protected, getTasks);
router.delete("/:id", protected, deleteTask);
router.put("/:id", protected, updateTask);
router.patch("/:id", protected, patchUpdate);
module.exports = router;
