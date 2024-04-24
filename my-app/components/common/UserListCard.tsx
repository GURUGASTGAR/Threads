import React from 'react'
import UserAvatar from './UserAvatar'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function UserListCard() {
  return (
    <div className='w-full shadow-sm p-4 rounded-md mb-3'>
      <div className='flex'>
        <UserAvatar name='Guru' image=''/>
        <div className='flex justify-between items-start w-full'>
          <div className='felx flex-col'>
            <div className='font-bold text-md ml-2'>Guru</div>
            <div className='text-xs font-light ml-2'>@guru</div>
          </div>
          <Link href='#'>
           <Button size='sm'>view</Button>
          </Link>
        </div>
      </div>
    </div>  
  )
}
