import { Comment as CommentProp } from '@prisma/client'
import axios from 'axios'
import type { NextPage } from 'next'
import CommentPanel from '../components/comment'
import { commentProp, userProp } from '../types'
import CreatePanel from '../components/CreatePanel'
import { useUser } from '../context/userContext'
import { useEffect, useState } from 'react'

const Home: NextPage<{ comments: commentProp[], currentUser: userProp }> = ({ comments, currentUser }) => {
  const { user, setUser } = useUser();
  useEffect(() => {
    setUser(currentUser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='bg-very-light-gray h-full p-4 text-dark-blue min-h-screen flex flex-col justify-center items-center'>
      <main className='container min-w-[300px] max-w-2xl grid gap-4'>
        {
          comments.map((comment: commentProp, id) => {
            return <CommentPanel key={id} comment={comment} />
          })
        }
        <CreatePanel />
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/comment`)
  const comments: CommentProp[] = res.data
  // console.log(comments);

  const resUser = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/user/currentUser`)
  const currentUser = resUser.data

  return {
    props: {
      comments,
      currentUser,
    },
  }
}
export default Home

