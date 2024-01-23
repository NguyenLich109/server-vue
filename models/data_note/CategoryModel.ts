import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    url: { type: String, require: true },
    complete: {type: Boolean, require: true, default: false}
  },
  {
    timestamps: true,
  }
);
const CategoryModel = mongoose.model("Category", CategorySchema);
export default CategoryModel;
