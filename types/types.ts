import { Comment } from '@prisma/client'
export interface commentProp extends Comment {
    replys: Comment[]
}
export interface userProp {
    id: number,
    username: string,
}
