import React from 'react'
import LeftSidebar from './LeftSidebar'
import Rightsidebar from './Rightsidebar'
import MobileNav from './MobileNav'
import { ScrollArea } from "@/components/ui/scroll-area"


export default function BaseComponent({children}:{children:React.ReactNode}) {
  return (
    <div className='md:container p-5'>
        <div className='flex'>
           
            <LeftSidebar/>
            <ScrollArea className='h-screen w-full lg:w-2/4 md:w-3/4 lg:px-8 lg:py-4 xl:px-12 md:p-6'>
               <MobileNav/>
            
                {children}
               
            </ScrollArea>
            <Rightsidebar/>
        </div>
    </div>
  )
}
