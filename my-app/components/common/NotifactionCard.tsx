import React from 'react'
import UserAvatar from './UserAvatar'
import { NotificationType } from '@/types'
import { formatDate } from '@/lib/utils'

export default function NotifactionCard({notification}:{notification:NotificationType}) {
  return (
    <div>
         <div className='flex space-x-2 mt-2'>
         <UserAvatar name={notification.user.name}/>
         <div className='bg-muted w-full rounded-lg p-4 hover:bg-gray-900'>
          <div className='flex justify-between items-start w-full'>
            <div className='font-bold'>{notification.user.name}</div>
            <div className='flex'>
                <div>{formatDate(notification.created_at)}</div>
            </div>
          </div>
          <div>{notification.content}</div>
         </div>
        </div>
    </div>
  )
}
