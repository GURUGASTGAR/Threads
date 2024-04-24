import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu, User2 } from 'lucide-react'
import Image from 'next/image'
import SideBarLinks from '../common/SideBarLinks'
import Link from 'next/link'
  

export default function MobileNav() {
  return (
    <nav className='md:hidden flex justify-between items-center'>
    <div className='flex items-center'>
     <Sheet>
      <SheetTrigger>
        <Menu height={30} width={30}/>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
           <SheetTitle>
            <div className="flex justify-start items-center">
               <Image src="/images/logo.svg" width={50} height={50} alt='logo'/>
                <h1 className="font-bold text-xl lg:text-3xl ml-2">Threads</h1>
            </div>
        </SheetTitle>
             <SheetDescription>
               <SideBarLinks/>
             </SheetDescription>
           </SheetHeader>
        </SheetContent> 
      </Sheet>
    </div>
    <Image src="/images/logo.svg" width={30} height={30} alt='logo'/>
    <Link href='/profile'>
        <User2 width={30} height={30}/>
    </Link>
    </nav>
  )
}
