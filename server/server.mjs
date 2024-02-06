import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToServer } from "./db/conn.mjs";
import notesRoutes from "./routes/notes.mjs";

const app = express();
dotenv.config({ path: "./config.env" });

const port = 8080;

app.use(cors());
app.use(express.json());
app.use(notesRoutes);

app.listen(port, () => {
  connectToServer((err) => {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});

export default app;
