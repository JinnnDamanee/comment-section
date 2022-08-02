import { NextApiHandler } from 'next';
import { prisma } from '../../../data/prisma';
const handler:NextApiHandler = async (req, res) => {
    // create a new user
    if(req.method==='POST'){
        const newUser = await prisma.comment.create({
            data:{
                content:req.body.content,
                author:{
                    connect:{
                        userId:req.body.userId
                    }
                }
            }
        })
        console.log(newUser);
        return res.status(200).json({newUser})
    }
    // Get all comments   
    if(req.method==='GET'){
        const comments = await prisma.comment.findMany({
            where:{
                replyId : null
            },
            include: {
                replys: {
                    include: {
                        replys:true
                    }
                }
            }
        });
        return res.status(200).json(comments);
    }
    return res.status(405).end('Method not allowed');
}
export default handler;