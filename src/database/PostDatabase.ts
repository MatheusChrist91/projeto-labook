import { TPostDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts";

    //get all posts
    public async getPosts(): Promise<TPostDB[]> {
        const postsDB: TPostDB[] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS);
        return postsDB;
    }

    // get all post id 

    public async findPostById(id: string): Promise<TPostDB | undefined> {
        const [postDB]: TPostDB[] | undefined[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where({ id });
    
        return postDB;
    }
    


    //post all Post
    public async insertPost(newPost: TPostDB): Promise<void> {
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .insert(newPost)
    }

    // put post
    public async updatePost(post: TPostDB): Promise<void> {
       
            await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
                .where({ id: post.id })
                .update({
                    creator_id: post.creator_id,
                    content: post.content,
                    likes: post.likes,
                    dislikes: post.dislikes
                    
                });
      
    }


    // delete post
    public async deletePost(id: string): Promise<void> {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
          .where({ id })
          .del();
      }



}