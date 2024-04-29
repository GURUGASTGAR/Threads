import React from 'react'
import UserListCard from '../common/UserListCard'
import { PostUser } from '@/types'
import { getUsers } from '@/lib/serverMethods'

export default async function Rightsidebar() {
  const users:Array<PostUser> | [] = await getUsers();
  return (
    <div className='h-screen w-full border-l-2 lg:w-1/4 lg:pt-5 lg:px-2 xl:p-5 hidden lg:block xl:block'>
        <h1 className='text-2xl font-bold mb-5'>Suggested For you</h1>
        {users?.length>0?users.map((user)=>(<UserListCard key={user.id} user={user}/>)):<div>No Suggestions for you</div>}
    </div>
  )
}
