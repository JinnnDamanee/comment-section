import { Comment } from '@prisma/client';
import { NextApiHandler } from 'next';
import { prisma } from '../../../data/prisma';


const voteHandler: NextApiHandler = async (req, res) => {
    let voteMessage: string = 'Upvoted!';
    try {
        if (req.body.voteType === 'up') {
            await prisma.comment.update({
                where: {
                    commentId: Number(req.query.id)
                },
                data: {
                    score: {
                        increment: 1
                    }
                }
            })
        } else {
            await prisma.comment.update({
                where: {
                    commentId: Number(req.query.id)
                },
                data: {
                    score: {
                        decrement: 1
                    }
                }
            })
            voteMessage = 'Downvoted!'
        }
        res.status(200).json({ message: voteMessage })
    } catch (error) {
        res.status(404).json({ message: 'Comment not found' })
    }

}

const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'DELETE') {
        try {
            await prisma.comment.delete({
                where: {
                    commentId: Number(req.query.id)
                }
            })
            res.status(200).json({ message: 'Comment deleted' });
        } catch (error) {
            res.status(400).json({ message: 'Comment not found' })
        }
    }
    if (req.method === 'PUT') {
        try {
            const comment = await prisma.comment.update({
                where: {
                    commentId: Number(req.query.id)
                },
                data: {
                    content: req.body.content
                }
            })
            res.status(200).json({ message: 'Comment updated', newComment: comment });
        } catch (error) {
            res.status(400).json({ message: 'Comment not found' })
        }
    }
    if (req.method === 'PATCH') {
        return voteHandler(req, res)
    }

    return res.status(405).end('Method not allowed');
}
export default handler;