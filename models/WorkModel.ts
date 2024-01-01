import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
      content:{type: String, require: true},
      isComplete: {type: Boolean, require: true, default: false}
    },
    {
      timestamps: true,
    }
  );

const WorkSchema = new mongoose.Schema(
  {
    idCategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    },
    title:{type: String, require: true},
    tasks: [taskSchema],
    isComplete: {type: Boolean, require: true, default: false}
  },
  {
    timestamps: true,
  }
);
const WorkModel = mongoose.model("work", WorkSchema);
export default WorkModel;
