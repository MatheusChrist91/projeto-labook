// TIPAGEM PARA A TABELA USER
export interface TUserDB  {
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: string;
    role: string
  };
  
  // TIPAGEM PARA A TABELA POSTS
  export interface TPostDB  {
    id: string;
    creator_id: string;
    content: string;
    likes: number;
    dislikes: number;
    created_at: string;
    updated_at: string
  };
  
  // TIPAGEM PARA A TABELA LIKE_DESLIKE
  export interface TLikeDislikeDB  {
    user_id: string;
    post_id: string;
    like: number // 1 PARA LIKE E -1 PARA DESLIKE
  };
  