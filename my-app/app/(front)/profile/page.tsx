import UserProfileAvatar from '@/components/common/UserAvatar'
import { MoveLeft } from 'lucide-react'
import React from 'react'

export default function page() {
  return (
    <div>
        <div className='flex space-x-8 items-center '>
           <MoveLeft width={30} height={30} className='cursor-pointer'/>
           <h1 className='text-xl font-bold'>Profile</h1>
        </div>
        <div className='mt-5 flex items-center space-x-4'>
             <UserProfileAvatar name='Guru'/>
        </div>
    </div>
  )     
}
