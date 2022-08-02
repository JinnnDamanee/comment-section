import { NextApiHandler } from 'next';
import { prisma } from '../../../data/prisma';

// without ReplyTo
const createPostHandler: NextApiHandler = async (req, res) => {
    const newComment = await prisma.comment.create({
        data: {
            content: req.body.content,
            author: {
                connect: {
                    userId: req.body.userId
                }
            }
        }
    })
    console.log(newComment);
    return res.status(200).json({ newComment })
}

// with ReplyTo
const replyPostHandler: NextApiHandler = async (req, res) => {
    const newComment = await prisma.comment.create({
        data: {
            content: req.body.content,
            replyTo: {
                connect: {
                    commentId: req.body.replyTo
                }
            },
            author: {
                connect: {
                    userId: req.body.userId
                }
            }
        }
    })
    console.log(newComment);
    return res.status(200).json({ newComment })
}

const handler: NextApiHandler = async (req, res) => {
    // create a new Comment
    if (req.method === 'POST') {
        if (req.body.replyTo === null) {
            return createPostHandler(req, res);
        } else {
            return replyPostHandler(req, res);
        }
    }
    // Get all comments   
    if (req.method === 'GET') {
        const comments = await prisma.comment.findMany({
            where: {
                replyId: null
            },
            include: {
                replys: {
                    include: {
                        replys: true
                    }
                }
            }
        });
        return res.status(200).json(comments);
    }
    return res.status(405).end('Method not allowed');
}
export default handler;