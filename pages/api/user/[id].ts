import { NextApiHandler } from 'next';
import { prisma } from '../../../data/prisma';
const handler:NextApiHandler = async (req, res) => {

    if(req.method==='GET'){
        try {
            const user = await prisma.user.findUnique({
                where:{
                    userId:Number(req.query.id)
                }
            })
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({message:'User not found'})
        }
    }
    
    return res.status(405).end('Method not allowed');
}
export default handler;