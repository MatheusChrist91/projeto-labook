import express, { Request, Response } from "express";
import cors from "cors";
import { TUserDB, TPostDB, TLikeDislikeDB } from "./types";
import { User } from "./models/Users";
import { UserDatabase } from "./database/UserDatabase";
import { UserController } from "./controller/UserController";
import { PostController } from "./controller/PostController";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`);
});

const userController = new UserController();
const postController = new PostController();

// CRUD DE USER
// seleciona todos os usuários
app.get("/users", userController.getUsers);

// cria novo usuário
app.post("/users", userController.createUser)

// edita um usuário pelo, usando o id
app.put("/users/:id", userController.editUsers)

// deleta um usuário através do id
app.delete("/users/:id", userController.deleteUsers)

// FIM DO CRUD DE USERS

// CRUD DE POST
// seleciona todos os posts
app.get("/posts", postController.getPosts);

// cria um novo post
app.post("/posts", postController.postPost);

// edita um post
app.put("/posts/:id", postController.putPost);

// deleta um post através o id
app.delete("/posts/:id", postController.deletePost);
