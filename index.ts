import express, { Express } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./config/MongoDb";


import CategoryRoute from "./routes/api_note/CategoryRoute";
import WorkRoute from "./routes/api_note/WorkRoute";
import ApiCategoryComic from "./routes/api_comic/api_category";
import ApiComic from "./routes/api_comic/api_comic";
import ApiChapter from "./routes/api_comic/api_chapter";

dotenv.config();
connectDB()

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

// api with project notes
app.use('/api/category',CategoryRoute)
app.use('/api/work',WorkRoute)

// api with project comic
app.use('/api/comic/category', ApiCategoryComic)
app.use('/api/comic/story', ApiComic)
app.use('/api/comic/chapter',ApiChapter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});