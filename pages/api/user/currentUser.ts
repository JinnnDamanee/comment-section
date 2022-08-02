import { NextApiHandler } from 'next';
const handler:NextApiHandler = async (req, res) => {
    if(req.method!=='GET'){
        res.status(405).end('Method not allowed');
    } else {
        // Mock Current User
        const user = {
            id: 1,
            username: 'juliusomo',
        }
        res.status(200).json(user)
    }
}
export default handler;