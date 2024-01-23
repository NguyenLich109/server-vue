import mongoose from "mongoose";
const comicSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    author: {type: String, require: true},
    status:{type: Boolean, require: true, default: false},
    number_chap:{type: Number, require: true, default: 0},
    image:{type: String, require: true},
    abbreviate:{type: String, require: true},
    genre: [
      {
        type:mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'categoryComic'
      }
    ],
  },
  {
    timestamps: true,
  }
);
const ComicModel = mongoose.model("comic", comicSchema);
export default ComicModel;
