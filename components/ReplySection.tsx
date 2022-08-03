import { Dispatch, useState } from "react";
import { useUser } from "../context/userContext";
import useCommentStore from "../hooks/useCommentStore";
import Image from 'next/image'
import { commentProp } from "../types";

const ReplySection: React.FC<{ commentTo: commentProp, setShowReply: Dispatch<boolean> }> = ({ commentTo, setShowReply }) => {
    const { user } = useUser(); // juliusomo
    const defaultUserImageUrl = 'https://raw.githubusercontent.com/JinDamanee2544/comment-section/main/images/avatars/image-amyrobson.webp'
    const [content, setContent] = useState('')
    const { replyPost } = useCommentStore();


    const replyhandler = () => {
        if (commentTo.replyId === null) {   // is Main Comment? 
            replyPost(content, user.id, setContent, setShowReply, commentTo.commentId) // reply to main
        } else {
            replyPost(content, user.id, setContent, setShowReply, commentTo.replyId) // reply to reply (switch to main comment that point to)
        }
    }

    return (
        <div className=" bg-white flex p-4 rounded-lg justify-between items-start -mt-2">
            <Image src={user.imageUrl === 'www.test.com' ? defaultUserImageUrl : user.imageUrl} height={50} width={50} alt='user' />
            <textarea placeholder='Add a comment...' className="w-full mx-2 p-2" value={content} onChange={(e) => setContent(e.target.value)} />
            <button className="btn btn-ghost bg-medium-blue hover:bg-light-blue text-white" onClick={() => replyhandler()}>SEND</button>
        </div>
    )
}
export default ReplySection;