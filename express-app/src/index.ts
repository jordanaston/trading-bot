import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use("/", routes);

const CONNECTION_URL = process.env.CONNECTION_URL as string;

console.log(CONNECTION_URL)

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    })
  )
  .catch((error: unknown) => console.error((error as Error).message));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
