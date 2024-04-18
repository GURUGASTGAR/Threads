/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthTypes } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function page() {
    const [authState, setAuthState] = useState<AuthTypes>();
    const submit = (event:React.FormEvent)=>{
        event.preventDefault()
        setAuthState({...authState,email:""})
        console.log(authState);
    }

  return (
    <div className="bg-background">
        <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-muted mx-2 p-6 rounded-lg">
            <div className="w-full flex justify-center"><Image src="/images/logo.svg" width={50} height={50} alt="logo" /></div>
            <h1 className="font-bold text-2xl">Login</h1>
            <p>Welcome back</p>
            <form onSubmit={submit}>
            <div className="mt-5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" placeholder="Enter your email"
                    onChange={(e)=>setAuthState({...authState, email:e.target.value})}/>
            </div>
            <div className="mt-5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" placeholder="Enter your password" 
                    onChange={(e)=>setAuthState({...authState,password:e.target.value})}/>
            </div>
            <div className="mt-5">
              <Button className="w-full" 
                       type="submit">Login</Button>
            </div>
            </form>
            <div className="w-full flex justify-center mt-5">
            <span>Dont have an Account?</span>
            <Link href={"/signup"} className="font-bold text-orange-400 hover:text-blue-500 ml-2 hover:underline ml-2">Register</Link>
            </div>       
        </div>
        </div>
    </div>
  )
}
