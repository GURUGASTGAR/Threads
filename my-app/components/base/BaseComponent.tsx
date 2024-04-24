import React from 'react'
import LeftSidebar from './LeftSidebar'
import Rightsidebar from './Rightsidebar'
import MobileNav from './MobileNav'
import Image from 'next/image'
import AddThread from '../threads/AddThread'

export default function BaseComponent() {
  return (
    <div className='md:container p-5'>
        <div className='flex'>
           
            <LeftSidebar/>
            <div className='h-screen w-full lg:w-2/4 md:w-3/4 lg:px-8 lg:py-4 xl:px-12 md:p-6'>
               <MobileNav/>
               <div className='flex justify-center items-center'>
               <Image src="/images/logo.svg" width={40} height={40} alt='logo'/>
               </div>
               <AddThread/>
            </div>
            <Rightsidebar/>
        </div>
    </div>
  )
}
