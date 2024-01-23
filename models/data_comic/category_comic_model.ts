import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);
const CategoryComicModel = mongoose.model("categoryComic", CategorySchema);
export default CategoryComicModel;