import { postRouter } from './router/postRouter';
import express, { Request, Response } from "express";
import cors from "cors";
import { userRouter } from "./router/userRouter";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3003; 

app.listen(Number(process.env.PORT || 3003), () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});

app.use("/users", userRouter);

app.use("/posts", postRouter);