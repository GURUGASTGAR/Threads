/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthErrorTypes, AuthTypes } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from 'axios';
import Spinner from "@/components/ui/Spinner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default  function page() {
    const [authState, setAuthState] = useState<AuthTypes>();
    const {status} = useSession();
    const [errors, setErrors] =useState<AuthErrorTypes>();
    const [confirm,setConfirm] = useState<string>()
    const [loading,setLoading]= useState<boolean>(false)
    const router = useRouter();

    useEffect(()=>{
      if(status=='authenticated'){
            router.push("/")
      }
    },[status])



    const submit = async (event:React.FormEvent)=>{
        event.preventDefault()
        setLoading(true)
       // setAuthState({...authState,email:""})  // to clear the input box
          try {
            const response = await axios.post("/api/auth/signup",authState);
            const data = response.data;
            setLoading(false)
            if(data.status==400){
              const dataError =data.error
              console.log(dataError)
              const errors : AuthErrorTypes= {};
            
            dataError.forEach((error: { path: string }) => {
                switch (error.path) {
                    case 'name':
                        errors.name = "Name must be at least 3 characters long";
                        break;
                    case 'username':
                        errors.username = "Invalid email";
                        break;
                    case 'password':
                        errors.password = "Password must be at least 6 characters long";
                        break;
                    default:
                        break;
                }
            });
            setErrors(errors);
            throw new Error();
            }else if(data.status==200){
                router.push(`/login?message=${data.message}`)
            }
          } catch (error) {
            //console.log(JSON.stringify(error))
            setLoading(false);
           // console.log(JSON.stringify(error))
          }
            
      }

  return (
    <div className="bg-background">
        <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-muted mx-2 p-6 rounded-lg">
            <div className="w-full flex justify-center"><Image src="/images/logo.svg" width={50} height={50} alt="logo" /></div>
            <h1 className="font-bold text-2xl">Signup</h1>
            <p>Welcome to Threads</p>
            <form onSubmit={submit}>
            <div className="mt-5">
              <Label htmlFor="name">Name</Label>
              <Input type="text" placeholder="Enter your password" 
                    onChange={(e)=>setAuthState({...authState,name:e.target.value})}/>
                    <span className="text-red-400 font-semibold">{errors?.name}</span>
            </div>
            <div className="mt-5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" placeholder="Enter your email"
                    onChange={(e)=>setAuthState({...authState, username:e.target.value})}/>
                    <span className="text-red-400 font-semibold">{errors?.username}</span>
            </div>
            <div className="mt-5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" placeholder="Enter your password" 
                    onChange={(e)=>setAuthState({...authState,password:e.target.value})}/>
                    <span className="text-red-400 font-semibold">{errors?.password}</span>
            </div>
            <div className="mt-5">
              <Label htmlFor="Confirm-password">Confirm Password</Label>
              <Input type="password" placeholder="Confirm your password" 
                    onChange={(e)=>setConfirm(e.target.value)}/>
                    <span className="text-red-400 font-semibold">{authState?.password == confirm ? "":"password must be same"}</span>
            </div>
            <div className="mt-5">
              <Button className="w-full" 
                       type="submit" disabled={loading}>{loading ? <Spinner/>:"login"}</Button>
            </div>
            </form>
            <div className="w-full flex justify-center mt-5">
            <span>Already have an Account?</span>
            <Link href={"/login"} className="font-bold text-orange-400 hover:text-blue-500 ml-2 hover:underline">Login</Link>
            </div>       
        </div>
        </div>
    </div>
  )
}
