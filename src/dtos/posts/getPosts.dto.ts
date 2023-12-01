import z from 'zod'

import { PostModel } from '../../models/posts'

export interface GetPostsInputDTO {
  token: string
}

export type GetPostOutputDTO = PostModel[]

export const GetPostSchema = z.object({
  token: z.string().min(1)
}).transform(data => data as GetPostsInputDTO)