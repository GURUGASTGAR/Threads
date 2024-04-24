'use client'
import React from 'react'
import { Bell, Home, Search, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from '../ui/button';
import ThemeTogglebtn from './themeTogglebtn';
import SignoutBtn from './SignoutBtn';

export default function SideBarLinks() {
    const pathName =usePathname();
  return (
    <div>
         <ul className="mt-10">
        <li >
            <Link href='/' className={`flex items-center justify-start space-x-4 hover:font-bold ${pathName=='/'?'font-bold':''}`} >
                <Home height={25} width={25}/>
                <h3 className="text-lg lg:text-xl">Home</h3>
            </Link>
        </li>
        <li>
        <Link href='/explore'  className={`flex items-center justify-start space-x-4 mt-5 hover:font-bold ${pathName=='/explore'?'font-bold':''}`}>
                <Search height={25} width={25}/>
                <h3 className="text-lg lg:text-xl">Explore</h3>
            </Link>
        </li>
        <li>
        <Link href='/notification'  className={`flex items-center justify-start space-x-4 mt-5 hover:font-bold ${pathName=='/notifcation'?'font-bold':''}`}>
                <Bell width={25} height={25}/>
                <h3 className="text-lg lg:text-xl">Notification</h3>
            </Link>
        </li>
        <li>
        <Link href='/profile'  className={`flex items-center justify-start space-x-4 mt-5 hover:font-bold ${pathName=='/profile'?'font-bold':''}`}>
                <User2 width={25} height={25}/>
                <h3 className="text-lg lg:text-xl">Profile</h3>
            </Link>
        </li>
        <li className='flex items-center absolute bottom-10'>
          <SignoutBtn/>
          <ThemeTogglebtn/>
        </li>
      </ul>
    </div>
  )
}
