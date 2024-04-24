/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthTypes } from "@/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {signIn, useSession} from 'next-auth/react'


export default function page() {
    const [authState, setAuthState] = useState<AuthTypes>();
    const router =  useRouter()
    const { status } = useSession();
    const param = useSearchParams();
    const [loading,setLoading] = useState(false);
    const [errors ,setErrors] = useState();

    useEffect(()=>{
      if(status=="authenticated"){
          router.push('/')
      }
    },[status])
  


    const submit = async (event:React.FormEvent)=>{
        event.preventDefault()
        setLoading(true)
       // setAuthState({...authState,email:""})  // to clear the input box
          try {
            const response = await axios.post("/api/auth/login",authState);
            const data = response.data;
            
            setLoading(false)
            console.log(data.error)
            if(data.error){
              setErrors(data.error);
            }
            if(data.status==400){
              const dataError =data.error
              setErrors(data.error);
              console.log(errors)
            }else if(data.status==200){
             
               signIn('credentials',{
                username: authState?.username,
                password: authState?.password,
                callbackUrl:'/',
                redirect:true
              })
            }
          } catch (error) {
             console.log("erroris: ",error)
            setLoading(false);
            
          }
        }
  return (
    <div className="bg-background">
        <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-muted mx-2 p-6 rounded-lg">
            <div className="w-full flex justify-center"><Image src="/images/logo.svg" width={50} height={50} alt="logo" /></div>
            {param.get('message')?<div className="bg-green-500 p-4 my-3 rounded-lg">
                <strong>Success</strong> {param.get('message')}
              </div>:<div/>}
            <h1 className="font-bold text-2xl">Login</h1>
            <p>Welcome back</p>
            <form onSubmit={submit}>
            <div className="mt-5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" placeholder="Enter your email"
                    onChange={(e)=>setAuthState({...authState, username:e.target.value})}/>
                    <span className="text-red-400 font-semibold">{errors?"Invalid Credentials":""}</span>
            </div>
            <div className="mt-5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" placeholder="Enter your password" 
                    onChange={(e)=>setAuthState({...authState,password:e.target.value})}/>
            </div>
            <div className="mt-5">
              <Button className="w-full" 
                       type="submit" disabled={loading}>{loading?<Spinner/>:"Login"}</Button>
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
