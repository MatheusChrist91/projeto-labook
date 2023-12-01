import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError"; 
import { CreatePostSchema } from "../dtos/posts/createPost.dto"; 
import { GetPostSchema } from "../dtos/posts/getPosts.dto";
import { EditPostSchema } from "../dtos/posts/editPost.dto"; 
import { DeletePostSchema } from "../dtos/posts/deletePost.dto";
import { LikeOrDislikePostSchema } from "../dtos/posts/likeOrDislike.dto";
import * as http from 'http';
import { STATUS_CODES } from 'http';


export class PostController {
  constructor(
    private postBusiness: PostBusiness
  ) {}

  public createPost = async (req: Request, res: Response) => {
    try {
      const input = CreatePostSchema.parse({
        content: req.body.content,
        token: req.headers.authorization
      })

      const output = await this.postBusiness.createPost(input)

      const statusMessage = STATUS_CODES[201] || 'Created';

      res.status(201).send(`Post criado com sucesso ${output}. Status: ${statusMessage}`);
      
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public getPost = async (req: Request, res: Response) => {
    try {
      const input = GetPostSchema.parse({
        token: req.headers.authorization
      })

      const output = await this.postBusiness.getPost(input)

      res.status(200).send(output)
      
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public editPost = async (req: Request, res: Response) => {
    try {
      const input = EditPostSchema.parse({
        token: req.headers.authorization,
        content: req.body.content,
        idToEdit: req.params.id
      })

      const output = await this.postBusiness.editPost(input)

      res.status(200).send(`Post editado com sucesso ${output}`)
      
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public deletePost = async (req: Request, res: Response) => {
    try {
      const input = DeletePostSchema.parse({
        token: req.headers.authorization,
        idToDelete: req.params.id
      })

      const output = await this.postBusiness.deletePost(input)

      res.status(200).send(`Post deletado com sucesso ${output}`)
      
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public likeOrDislikePost = async (req: Request, res: Response) => {
    try {
      const input = LikeOrDislikePostSchema.parse({
        token: req.headers.authorization,
        postId: req.params.id,
        like: req.body.like
      })

      const output = await this.postBusiness.likeOrDislikePost(input)

      res.status(200).send(output)
      
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

}