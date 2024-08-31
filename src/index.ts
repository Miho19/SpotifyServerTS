import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import errorHandler from "./middleware/errorHandler";
import invalid from "./routes/invalid";

const app: Express = express();

app.use(invalid);
app.use(errorHandler);

export default app;
