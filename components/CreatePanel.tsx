import Image from "next/image";
import { useState } from "react";
import { useUser } from "../context/userContext";
import useCommentStore from "../hooks/useCommentStore";

const CreatePanel: React.FC = () => {

    const { user, setUser } = useUser(); // juliusomo

    const [content, setContent] = useState('')
    const testUrl = require('../images/avatars/image-juliusomo.png')

    const { createPost } = useCommentStore();

    return (
        <div className=" bg-white flex p-4 rounded-lg justify-between items-start">
            <Image src={testUrl} alt='user' />
            <textarea placeholder='Add a comment...' className="w-full mx-2 p-2" value={content} onChange={(e) => setContent(e.target.value)} />
            <button className="btn btn-ghost bg-medium-blue hover:bg-light-blue text-white" onClick={() => createPost(content, user.id, setContent)}>SEND</button>
        </div>
    )
}
export default CreatePanel;