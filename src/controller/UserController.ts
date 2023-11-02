import { Request, Response } from "express";
import { User } from "../models/Users";
import { TUserDB } from "../types";
import { UserDatabase } from "../database/UserDatabase";

export class UserController {
    public getUsers = async (req: Request, res: Response) => {
        try {
            const q = req.query.q as string;
      
            const userDatabase = new UserDatabase();
            const usersDB = await userDatabase.findUsers(q);
      
            const users: User[] = usersDB.map((userDB: TUserDB) => new User(
              userDB.id,
              userDB.name,
              userDB.email,
              userDB.password,
              userDB.role,
              userDB.created_at
            ));
      
            res.status(200).send(users);
          } catch (error) {
            console.log(error);
      
            if (res.statusCode === 200) {
              res.status(500);
            }
      
            if (error instanceof Error) {
              res.send(error.message);
            } else {
              res.send("Erro inesperado");
            }
          }
    }

    public createUser = async (req: Request, res: Response) => {
        try {
            const { id, name, email, password, role } = req.body;
        
            if (typeof id !== "string") {
              res.status(400);
              throw new Error("'id' deve ser string");
            }
        
            if (typeof name !== "string") {
              res.status(400);
              throw new Error("'name' deve ser string");
            }
        
            if (typeof email !== "string") {
              res.status(400);
              throw new Error("'email' deve ser string");
            }
        
            if (typeof password !== "string") {
              res.status(400);
              throw new Error("'password' deve ser string");
            }
        
            if (typeof role !== "string") {
              res.status(400);
              throw new Error("'password' deve ser string");
            }
        
            const userDatabase = new UserDatabase();
            const userDBExists = await userDatabase.findUserById(id);
        
            if (userDBExists) {
              res.status(400);
              throw new Error(" Este 'id' já existe em nosso banco de dados!");
            }
        
            const newUser = new User(
              id,
              name,
              email,
              password,
              role,
              new Date().toISOString()
            );
        
            const newUserDB: TUserDB = {
              id: newUser.getId(),
              name: newUser.getName(),
              email: newUser.getEmail(),
              password: newUser.getPassword(),
              role: newUser.getRole(),
              created_at: newUser.getCreatedAt(),
            };
        
            await userDatabase.createUser(newUserDB);
        
            res.status(201).send(newUser);
          } catch (error) {
            console.log(error);
        
            if (req.statusCode === 200) {
              res.status(500);
            }
        
            if (error instanceof Error) {
              res.send(error.message);
            } else {
              res.send("Erro inesperado");
            }
          }
    }

    public editUsers = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            const { name, email, password, role } = req.body;
        
            if (typeof name !== "string") {
              res.status(400);
              throw new Error("'name' deve ser string");
            }
        
            if (typeof email !== "string") {
              res.status(400);
              throw new Error("'email' deve ser string");
            }
        
            if (typeof password !== "string") {
              res.status(400);
              throw new Error("'password' deve ser string");
            }
        
            if (typeof role !== "string") {
              res.status(400);
              throw new Error("'password' deve ser string");
            }
        
            const userDatabase = new UserDatabase();
        
            // Verificar se o usuário com o ID existe
            const userExists = await userDatabase.findUserById(userId);
            if (!userExists) {
              res.status(404);
              throw new Error("Usuário não encontrado");
            }
        
            // Atualizar os dados do usuário
            userExists.name = name;
            userExists.email = email;
            userExists.password = password;
            userExists.role = role;
        
            // Salvar as mudanças no banco de dados
            await userDatabase.updateUser(userExists);
        
            res.status(200).send("Usuário atualizado com sucesso");
          } catch (error) {
            console.log(error);
        
            if (res.statusCode === 200) {
              res.status(500);
            }
        
            if (error instanceof Error) {
              res.send(error.message);
            } else {
              res.send("Erro inesperado");
            }
          }
    }

    public deleteUsers = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            const userDatabase = new UserDatabase();
        
            // Verificar se o usuário com o ID existe
            const userExists = await userDatabase.findUserById(userId);
            if (!userExists) {
              res.status(404);
              throw new Error("Usuário não encontrado");
            }
        
            // Excluir o usuário do banco de dados
            await userDatabase.deleteUser(userId);
        
            res.status(200).send("Usuário excluído com sucesso");
          } catch (error) {
            console.log(error);
        
            if (res.statusCode === 200) {
              res.status(500);
            }
        
            if (error instanceof Error) {
              res.send(error.message);
            } else {
              res.send("Erro inesperado");
            }
          }        
    }
}