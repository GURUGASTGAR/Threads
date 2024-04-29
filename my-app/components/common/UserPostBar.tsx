import React from 'react'
import UserAvatar from './UserAvatar'
import { MoreHorizontal } from 'lucide-react'
import { PostType } from '@/types'
import { formatDate } from '@/lib/utils'

export default function UserPostBar({post}:
  {post:PostType}
) {
  return (
    <div className="flex">    
        <UserAvatar name='guru' image=''/>
        <div className='flex justify-between w-full ml-2 items-start'>
          <strong>{post?.user?.name}</strong>
          <div className='flex items-center'>
              <span className='mr-2'>{formatDate(post.created_at)}</span>
              <MoreHorizontal height={22} width={22}/>
          </div>
        </div>
    </div>
  )
}
