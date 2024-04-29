import React from 'react'
import UserPostBar from './UserPostBar'
import Image from 'next/image'
import { Heart, MessageCircle, SendHorizonal } from 'lucide-react'
import { PostType } from '@/types'
import Env from '@/config/env'
import ImageViewer from './ImageViewer'

export default function PostCard({post}:{post:PostType}) {
  return (
    <div className='mb-8'>
        <UserPostBar post={post}/>
        <div className='ml-12 mt-[-12px]'>
         {post.content}
        </div>
        {post?.image && <ImageViewer image={post.image} />}
        <div className='mt-3 flex space-x-4'> 
             <Heart width={20} height={20} className='cursor-pointer'/>
             <MessageCircle width={20} height={20} className='cursor-pointer'/>
             <SendHorizonal width={20} height={20} className='cursor-pointer'/>
        </div>
        <div className='mt-2 '>
            <span>4 replies</span>
            <span className='ml-3'>1 likes</span>
        </div>
        <div className='h-[2px] bg-gray-900 rounded-xl w-full m-2'></div>
    </div>
  )
}
