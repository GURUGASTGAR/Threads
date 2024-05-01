'use client'
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { MessageCircle } from 'lucide-react'
import { PostError, PostType } from '@/types'
import UserPostBar from '../common/UserPostBar'
import UserAvatar from '../common/UserAvatar'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'

  

export default function AddComment({post}:{post:PostType}) {
    const { data } = useSession();
    const { toast } = useToast();
    const [content,setContent] = useState<string>("");
    const [loading,setLoading] =useState<boolean>(false);
    const [errors,setErrors] = useState<PostError>({});
    const router = useRouter();


    const submit = (e:React.FormEvent)=>{
        e.preventDefault()
        setLoading(true);
        axios.post("/api/comment",{
            content:content,
            post_id:post.id.toString()
        })
        .then((res)=>{
            const response = res.data
            if(response.status ==400){
                setErrors({postcomment:response.zoderror})
            } else if(response.status == 200){
                setContent("");
                setErrors({
                    postcomment:""
                });
                router.refresh();
                toast({
                    title:"Success",
                    description: response.message,
                    className:"bg-blue-500"
                })
            }
        })
        .catch((err)=>{
            setLoading(false);
            setErrors({
                postcomment:""
            });
        })
        setErrors({
            postcomment:""
        });
    }
  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
    <MessageCircle width={20} height={20} className='cursor-pointer'/>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Add Comment</AlertDialogTitle>
        <AlertDialogDescription>
          <div className='mt-5'>
            <UserPostBar post={post}/>
            <div className='ml-12 mt-[-12px]'>
                {post.content}
            </div>
            <div className='mt-5 flex justify-start items-start'>
               <UserAvatar name={data?.user?.name ?? "U"}/>
               <textarea className='w-full h-24 text-md p-2 bg-background outline-none resize-none rounded-lg placeholder:font-normal ml-2'
                placeholder='add Comment' value={content}
                onChange={(e)=>{setContent(e.target.value)}}/>
                
            </div>
            <span className='text-red-400 font-bold ml-14'>{errors.postcomment}</span>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={submit} disabled={loading || content.length<5}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  
  )
}
