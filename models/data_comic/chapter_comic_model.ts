import mongoose from "mongoose";
const chapterSchema = new mongoose.Schema(
  {
    name_chapter: { type: String, require: false },
    content_chapter: {type: String, require: true},
    number_chapter: {type: Number, require: true},
    id_story: 
      {
        type:mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'comic'
      }
  },
  {
    timestamps: true,
  }
);
const ChapterModel = mongoose.model("chapter", chapterSchema);
export default ChapterModel;
