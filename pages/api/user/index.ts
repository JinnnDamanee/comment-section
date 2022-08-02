import { NextApiHandler } from 'next';
import { prisma } from '../../../data/prisma';
const handler:NextApiHandler = async (req, res) => {
    // Get all users
    if(req.method==='GET'){
        const users = await prisma.user.findMany();
        console.log(users);
        return res.status(200).json({users})
    } 
    
    return res.status(405).end('Method not allowed');
    
}
export default handler;