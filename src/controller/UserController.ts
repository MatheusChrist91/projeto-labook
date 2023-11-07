import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
  public getUsers = async (req: Request, res: Response) => {
    try {
      const input = {
        q: req.query.q as string,
      };

      const userBusiness = new UserBusiness();
      const output = await userBusiness.getUser(input);

      res.status(200).send(output);
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
  };

  public createUser = async (req: Request, res: Response) => {
    try {
      const input = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.id,
        role: req.body.role,
      };

      const userBusiness = new UserBusiness();
      const output = await userBusiness.createUser(input);

      res.status(201).send(output);
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
  };

  public editUsers = async (req: Request, res: Response) => {
    try {
      const input = {
        id: req.params.id,
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role,
      };

      const userBusiness = new UserBusiness();
      const output = await userBusiness.editUsers(input);

      res.status(200).send(`Usuário ${output.name} atualizado com sucesso`);
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
  };

  public deleteUsers = async (req: Request, res: Response) => {
    try {
      const input = {
        id: req.params.id,
      };

      const userBusiness = new UserBusiness();
      const output = await userBusiness.deleteUsers(input);

      res.status(200).send(`Usuário ${output.name} excluído com sucesso!`);
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
  };
}
