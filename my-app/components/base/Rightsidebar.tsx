import React from 'react'
import UserListCard from '../common/UserListCard'

export default function Rightsidebar() {
  return (
    <div className='h-screen w-full border-l-2 lg:w-1/4 lg:pt-5 lg:px-2 xl:p-5 hidden lg:block xl:block'>
        <h1 className='text-2xl font-bold mb-5'>Suggested For you</h1>
        <UserListCard/>
    </div>
  )
}
