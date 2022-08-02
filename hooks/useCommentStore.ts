import axios from 'axios';
import Router from 'next/router';
import { Dispatch, SetStateAction } from 'react';

const createPost = (content: string, id: number, setContent: Dispatch<string>) => {
    if (content) {
        axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/comment`, { content, userId: id, replyTo: null })
            .then(res => {
                Router.push('/')
                setContent('')
            })
            .catch(err => console.log(err))
    } else {
        console.log('Please enter a comment');
    }
}
const replyPost = (content: string, id: number, setContent: Dispatch<string>, setShowReply: Dispatch<boolean>, replyTo: number) => {
    if (content) {
        axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/comment`, { content, userId: id, replyTo })
            .then(res => {
                Router.push('/')
                setContent('')
                setShowReply(false)
            })
            .catch(err => console.log(err))
    } else {
        console.log('Please enter a comment');
    }
}
const deleteComment = async (commentId: number) => {
    axios.delete(`${process.env.NEXT_PUBLIC_HOST}/api/comment/${commentId}`)
        .then(res => {
            console.log('Deleted!');
            Router.push('/')
        })
        .catch(err => console.log(err))
}
const updateComment = async (commentId: number, content: string, setMode: Dispatch<SetStateAction<'edit' | 'view'>>) => {
    if (content) {
        axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/comment/${commentId}`, { content })
            .then(res => {
                console.log('Updated!');
                setMode('view')
                Router.push('/')
            })
            .catch(err => console.log(err));
    } else {
        console.log('Please enter a comment');
    }
}
const upVoteComment = async (commentId: number) => {
    axios.patch(`${process.env.NEXT_PUBLIC_HOST}/api/comment/${commentId}`, { voteType: 'up' })
        .then(res => {
            console.log('Upvoted!');
            Router.push('/')
        })
        .catch(err => console.log(err))
}
const downVoteComment = async (commentId: number) => {
    axios.patch(`${process.env.NEXT_PUBLIC_HOST}/api/comment/${commentId}`, { voteType: 'down' })
        .then(res => {
            console.log('downvoted!');
            Router.push('/')
        })
        .catch(err => console.log(err))
}
const useCommentStore = () => {
    return {
        createPost,
        replyPost,
        deleteComment,
        updateComment,
        upVoteComment,
        downVoteComment
    }
}
export default useCommentStore;