import { Request, Response } from "express";
import { Post } from "../models/Post";
import { PostDatabase } from "../database/PostDatabase";
import { TPostDB } from "../types";
import { UserDatabase } from "../database/UserDatabase";
import { format } from "date-fns"

export class PostController {
    
    public getPosts = async (req: Request, res: Response) => {
      try {
        const postDatabase = new PostDatabase();
        const postsDB: TPostDB[] = await postDatabase.getPosts();
  
        const posts = postsDB.map((postData) => ({
          id: postData.id,
          creator_id: postData.creator_id,
          content: postData.content,
          likes: postData.likes,
          dislikes: postData.dislikes,
          created_at: postData.created_at,
          updated_at: postData.updated_at,
        }));
  
        res.status(200).send(posts);
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
  
    public postPost = async (req: Request, res: Response) => {
      try {
          const { id, creator_id, content, likes, dislikes } = req.body;
  
          const postDatabase = new PostDatabase();
          const userDatabase = new UserDatabase();
  
          // Verifica se o criador do post (creator_id) existe antes de inserir
          const userExists = await userDatabase.findUserById(creator_id);
  
          if (!userExists) {
              res.status(404).send('Usuário não encontrado');
              return;
          }
  
          // Insere o novo post com as datas formatadas corretamente
  
          const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  
          // Insere o novo post com as datas formatadas corretamente
          await postDatabase.insertPost({
              id,
              creator_id,
              content,
              likes,
              dislikes,
              created_at: currentDate,
              updated_at: currentDate
          });
  
          res.status(201).send('Post criado com sucesso!');
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
  
  
  public putPost = async (req: Request, res: Response) => {
      try {
          const { id, creator_id, content, likes, dislikes, created_at, updated_at } = req.body;
          const postDatabase = new PostDatabase();
  
          const updatedPost: TPostDB = {
              id,
              creator_id,
              content,
              likes,
              dislikes,
              created_at,
              updated_at
          };
  
          await postDatabase.updatePost(updatedPost);
  
          res.status(200).send('Post atualizado com sucesso!');
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
        const postId = req.params.id;
  
        // Verificar se o post com o ID existe
        const postDatabase = new PostDatabase();
        const postExists = await postDatabase.findPostById(postId);
  
        if (!postExists) {
          res.status(404).send('Post não encontrado');
          return;
        }
  
        // Remover o post do banco de dados
        await postDatabase.deletePost(postId);
  
        res.status(200).send('Post excluído com sucesso');
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