import { Request, Response } from "express";
import { PostDatabase } from "../database/PostDatabase";
import { TPostDB } from "../types";
import { PostBusiness } from "../business/PostBusiness";

export class PostController {
  public getPosts = async (req: Request, res: Response) => {
    try {
      const input = {
        q: req.query.q as string,
      };

      const postBusiness = new PostBusiness();
      const output = await postBusiness.getPosts(input);

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

  public createPost = async (req: Request, res: Response) => {
    try {
      const input = {
        id: req.body.id,
        creator_id: req.body.creator_id,
        content: req.body.content,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
      };

      const postBusiness = new PostBusiness();
      const output = await postBusiness.createPost(input);

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

  public editPost = async (req: Request, res: Response) => {
    try {
      const input = {
        id: req.body.id,
        creator_id: req.body.creator_id,
        content: req.body.content,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
      };

      const postBusiness = new PostBusiness()
      const output = await postBusiness.editPost(input)


      res.status(200).send(`Post de ${output?.creator_id} atualizado com sucesso!`);
  } catch (error) {
      console.log(error);

      if (res.statusCode === 200) {
          res.status(500);
      }

      if (error instanceof Error) {
          res.send(error.message);
      } else {
          res.send('Erro inesperado');
      }
  }
  };

  public deletePost = async (req: Request, res: Response) => {
    try {
      const input = {
        postId: req.params.id
      }

      const postBusiness = new PostBusiness()
      const output = await postBusiness.deletePost(input)


      res.status(200).send(`Post ${output.id} excluído com sucesso'`);
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