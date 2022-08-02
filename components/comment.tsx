import Image from 'next/image';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FaReply, FaTrash, FaPen } from 'react-icons/fa'
import { commentProp } from '../types';
import axios from 'axios';
import { User } from '@prisma/client';
import { useUser } from '../context/userContext';

import { useMediaQuery } from '../hooks/useMediaQuery';

import useCommentStore from '../hooks/useCommentStore';
import DeleteModal from './DeleteModal';

const CommentPanel: React.FC<{ comment: commentProp }> = ({ comment }) => {

    const { user } = useUser();
    const isMobileSize: Boolean = useMediaQuery(640);

    const [username, setUsername] = useState('Loading...');
    const [imageUrl, setImageUrl] = useState('https://raw.githubusercontent.com/JinDamanee2544/comment-section/main/images/avatars/image-amyrobson.webp');
    const [isReady, setIsReady] = useState(false);
    const [date, setDate] = useState<Date>()
    const { deleteComment, updateComment, upVoteComment, downVoteComment } = useCommentStore();
    const [mode, setMode] = useState<'edit' | 'view'>('view');

    const [showModal, setShowModal] = useState(false);

    const fetchUser = async () => {
        const res = await axios.get(`http://localhost:3000/api/user/${comment.authorId}`)
        const user: User = res.data;
        setUsername(user.username)
        setImageUrl(user.imageUrl)
        setIsReady(true)
    }

    useEffect(() => {
        fetchUser();
        setDate(new Date(`${comment.createdAt}`))
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const VoteButton = () => {
        const [vote, setVote] = useState<number>(Number(comment.score));
        const handleVote = (voteType: 'up' | 'down') => {
            if (voteType === 'up') {
                upVoteComment(comment.commentId)
            } else {
                downVoteComment(comment.commentId)
            }
        }
        return (
            <div className='flex sm:flex-col mr-4 items-center bg-very-light-gray rounded-xl h-fit'>
                <button className='voteBtn' onClick={() => handleVote('up')}>+</button>
                <span className='font-bold text-medium-blue mx-4 sm:mx-2'>{vote}</span>
                <button className='voteBtn' onClick={() => vote === 0 ? 0 : handleVote('down')}>-</button>
            </div>
        )
    }

    const ButtonPanel = () => {
        if (comment.authorId === user.id) {
            return (
                <div className='flex'>
                    <button className='replyBtn text-soft-red hover:text-pale-red' onClick={() => setShowModal(true)}>
                        <FaTrash className='mr-2' />
                        Delete
                    </button>
                    <button className='replyBtn' onClick={() => setMode('edit')}>
                        <FaPen className='mr-2' />
                        Edit
                    </button>
                </div>
            )
        } else {
            return (
                <button className='replyBtn'>
                    <FaReply className='mr-2' />
                    Reply
                </button>
            )
        }
    }

    const Header = () => {
        // date.toLocaleString()         // 5/12/2020, 6:50:21 PM
        // date.toLocaleDateString()     // 5/12/2020
        // date.toLocaleTimeString()     // 6:50:21 PM
        return (
            <div className='flex items-center flex-shrink-0'>
                <Image src={imageUrl} alt='amy' height={30} width={30} />
                <h1 className='mx-2 font-bold text-medium-blue'>{username}</h1>
                {comment.authorId === user.id && <span className='bg-medium-blue text-white text-sm p-1 rounded'>You</span>}
                <h1 className='mx-2 text-grayish-blue'>{date?.toLocaleDateString()}</h1>
            </div>
        )
    }
    const SubComment = () => {
        if (comment.replys.length === 0) {
            return null
        }
        return (
            <div className='flex'>
                <div className='border-2 border-white ml-4 mr-4' />
                <div className='w-full'>
                    {   // @ts-ignore -- disable error next line
                        comment.replys.map((reply: commentProp, idx) => {
                            return <CommentPanel key={idx} comment={reply} />
                        })
                    }
                </div>
            </div>
        )
    }
    const Detail = () => {
        // Put EditContent here to prevent re-rendering
        const [editContent, setEditContent] = useState(comment.content);
        const onChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
            setEditContent(e.target.value);
        }

        return (
            <>
                <section className="flex flex-col w-full">
                    <div className='flex items-center justify-between my-4 w-full'>
                        <Header />
                        {!isMobileSize &&
                            <ButtonPanel />
                        }

                    </div>
                    {mode === 'edit' ?
                        <div className='flex flex-col items-end'>
                            <textarea className='w-full h-fit' value={editContent} onChange={onChangeInput} />
                            <button className='btn btn-ghost bg-medium-blue hover:bg-light-blue text-white px-4 mt-2'
                                onClick={() => updateComment(comment.commentId, editContent, setMode)}>
                                Update
                            </button>
                        </div>
                        :
                        <p>{comment.content}</p>}
                </section>
                {
                    isMobileSize &&
                    <div className='flex justify-between items-center mt-4'>
                        <VoteButton />
                        <ButtonPanel />
                    </div>
                }
            </>
        )
    }
    return (
        <>
            <div className="bg-white flex p-4 flex-col sm:flex-row rounded-lg">
                {!isMobileSize && <VoteButton />}
                <Detail />
            </div>
            <SubComment />
            {showModal && <DeleteModal onConfirm={() => deleteComment(comment.commentId)} showModal={showModal} setShowModal={setShowModal} />}
        </>
    )

}

export default CommentPanel;