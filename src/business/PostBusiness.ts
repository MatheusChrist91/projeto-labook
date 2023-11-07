import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { TPostDB } from "../types";
import { format } from "date-fns";

export class PostBusiness {
  public getPosts = async (input: any) => {
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

    return posts;
  };

  public createPost = async (input: any) => {
      const { id, creator_id, content, likes, dislikes} = input

    const postDatabase = new PostDatabase();
    const userDatabase = new UserDatabase();

    // Verifica se o criador do post (creator_id) existe antes de inserir
    const userExists = await userDatabase.findUserById(creator_id);

    if (!userExists) {
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
      updated_at: currentDate,
    });

    return userExists
  };

  public editPost = async (input: any) => {
    const {
      id,
      creator_id,
      content,
      likes,
      dislikes,
      created_at,
      updated_at,
    } = input;

    if (typeof id !== "string") {
      throw new Error("'id' deve ser uma string");
    }

    if (typeof creator_id !== "string") {
      throw new Error("'id' deve ser uma string");
    }

    if (typeof content !== "string") {
      throw new Error("'id' deve ser uma string");
    }

    if (typeof likes !== "number") {
      throw new Error("'id' deve ser uma number");
    }

    if (typeof dislikes !== "number") {
      throw new Error("'id' deve ser uma number");
    }    

    const postDatabase = new PostDatabase();
    const postExists = await postDatabase.findPostById(id);
    if (!postExists) {
      throw new Error("Usuário não encontrado");
    }

    const updatedPost: TPostDB = {
      id,
      creator_id,
      content,
      likes,
      dislikes,
      created_at,
      updated_at,
    };

    await postDatabase.updatePost(updatedPost);

    return updatedPost
  }

  public deletePost = async (input: any) => {
    const { postId} = input
     // Verificar se o post com o ID existe
     const postDatabase = new PostDatabase();
     const postExists = await postDatabase.findPostById(postId);

    if (!postExists) {
        throw new Error('Post não encontrado');
    }

     // Remover o post do banco de dados
     await postDatabase.deletePost(postId);

     return postExists
    }
  }