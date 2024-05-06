import React from 'react'
import UserPostBar from './UserPostBar'
import { Heart, MessageCircle, SendHorizonal } from 'lucide-react'
import { PostType } from '@/types'

import ImageViewer from './ImageViewer'
import AddComment from '../threads/AddComment'
import Link from 'next/link'

export default function PostCard({post, noRedirect , isAuthCard }:{post:PostType,noRedirect?:boolean, isAuthCard?:boolean}) {
  return (
    <div className='mb-8'>
        <UserPostBar isAuthCard={isAuthCard} post={post}/>
        <div className='ml-12 mt-[-2px]'>
         <Link href={noRedirect?"#":`/post/${post.id}`} className='cursor-pointer'>{post.content}</Link>
        </div>
        {post?.image && <ImageViewer image={post.image} />}
        <div className='mt-3 flex space-x-4'> 
             <Heart width={20} height={20} className='cursor-pointer'/>
             <AddComment post={post}/>
             <SendHorizonal width={20} height={20} className='cursor-pointer'/>
        </div>
        <div className='mt-2 '>
            <span>{post.comment_count} comments</span>
            <span className='ml-3'>1 likes</span>
        </div>
        <div className='h-[2px] bg-gray-900 rounded-xl w-full m-2'></div>
    </div>
  )
}
