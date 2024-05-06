
'use client'
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
import axios from "axios";
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import React from 'react'
import { useToast } from "../ui/use-toast";

export default function DeleteComment({id}:{id:number}) {
  const {toast} = useToast();
  const router = useRouter();
  const deleteComment = ()=>{
    axios.delete(`/api/comment/${id}`)
    .then((res)=>{
        const response = res.data;
        if(response.status==200){
            router.refresh();
          toast({
            title:"Deleted",
            description: response.message,
            className:"bg-green-500"
          })
        }
    })
    .catch((err)=>{
        router.refresh();
        console.log("delete post:",err)
    })
  }


  return (
    <AlertDialog>
  <AlertDialogTrigger asChild><Trash2 width={20} height={20} className="text-red-400 cursor-pointer"/></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your Comment
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={deleteComment}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}
  