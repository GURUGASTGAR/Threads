"use client"
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import Env from '@/config/env'
  

export default function ImageViewer({image}:{image:string}) {
  return (
    <div>
        <Sheet>
  <SheetTrigger asChild>
  <Image className='w-full rounded-md mt-2 h-[360px] cursor-pointer object-cover' 
        src={`${Env.APP_URL}/uploads/${image}`}
        width={100} height={100} alt='post logo'/>
  </SheetTrigger>
  <SheetContent side="bottom">
    <SheetHeader>
      <SheetTitle>Show Image</SheetTitle>
      <SheetDescription className='mb-4 w-full flex justify-center items-center'>
      <Image className='w-full rounded-md mt-2 h-[500px] cursor-pointer object-contain' 
        src={`${Env.APP_URL}/uploads/${image}`}
        width={100} height={100} alt='post logo'
        unoptimized
        />
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

    </div>
  )
}
