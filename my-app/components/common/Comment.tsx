import { CommentType } from '@/types'
import React from 'react'
import UserAvatar from './UserAvatar'
import { formatDate } from '@/lib/utils'

export default function Comment({comment}:{comment: CommentType}) {
  return (

       <div className='flex justify-start items-start mb-5'>
       <UserAvatar name={comment.user.name}/>
       <div className='ml-2 w-full bg-muted rounded-md p-3 max-h-[200px] overflow-auto'>
        <div className='flex justify-between w-full'>
        <div className='font-mono text-sm'>@{comment.user.name.split(' ')[0]}</div>
       <div className='text-sm text-gray-500'>{formatDate(comment.created_at)}</div>
        </div>
       <div className='text-md text-gray-300 mt-[-2px] overflow-auto'>{comment.content}</div>
       </div>
       </div> 
  )
}
