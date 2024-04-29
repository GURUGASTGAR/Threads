'use client'
import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function DynamicNav({title}:{title:string}) {
    const router = useRouter();
  return (
    <div className='flex space-x-8 items-center '>
           <MoveLeft width={30} height={30} className='cursor-pointer' onClick={()=>{
            router.back()
           }}/>
           <h1 className='text-xl font-bold'>{title}</h1>
        </div>
  )
}
