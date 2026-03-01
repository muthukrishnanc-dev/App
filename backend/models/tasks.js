const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, index: true },
    task: {
      type: String,
      required: [true, "Cannot set empty task"],
    },
    isCompleted: { type: Boolean, default: false },
    isEdit: { type: Boolean, default: false },
  },
  { timestamps: true },
);

taskSchema.index({ userId: 1, task: 1 }, { unique: true });
const Tasks = new mongoose.model("tasks", taskSchema);
module.exports = Tasks;
