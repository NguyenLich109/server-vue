import express, { Express } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./config/MongoDb";


import CategoryRoute from "./routes/CategoryRoute";
import WorkRoute from "./routes/WorkRoute";

dotenv.config();
connectDB()

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use('/api/category',CategoryRoute)
app.use('/api/work',WorkRoute)
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});