/* eslint-disable jsx-a11y/alt-text */
'use client'
import React, { useState } from 'react'
import UserAvatar from '../common/UserAvatar'
import { Image } from 'lucide-react'
import { Button } from '../ui/button'
import { useRef } from 'react'  
import ImagePreviewCard from '../common/ImagePreviewCard'
import axios from 'axios'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'



export default function AddThread() {
    const imageRef = useRef<HTMLInputElement>(null)
    const [image ,setImage] = useState<File| null>(null)
    const [previewUrl, SetPreviewUrl] = useState<string | undefined>();
    const [content,setContent] = useState<string>("");
    const [loading,setloading]= useState<boolean>(false)
    const [errors,setErrors] = useState({})
    const { toast } = useToast()
    const router = useRouter()

    const onHandleClick = ()=>{
        imageRef.current?.click();
    }
    

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
       const selectedFile = event.target.files?.[0]
       if(selectedFile){
        console.log("selectsd file is:", selectedFile)
        setImage(selectedFile);
        const imageUrl = URL.createObjectURL(selectedFile);
        SetPreviewUrl(imageUrl);
       }
            
    }
    const removePreviewImage= ()=>{
        setImage(null);
        SetPreviewUrl(undefined);
    }

    const submit = ()=>{
       setloading(true)
      const formData = new FormData;
      formData.append("content",content);
      if (image)formData.append("image",image);
       axios.post("/api/post",formData)
        .then((res)=>{
          setloading(false);
          const response = res.data;
          if(response.status == 400){
            setErrors(response.error)
            console.log(errors)
          }else if(response.status==200){
            setErrors({});
            setContent("");
            setImage(null);
            SetPreviewUrl(undefined)
            router.refresh();
            toast({
              title:"Succesfull",
              description: response.message,
              className:"bg-blue-500"
            })
          }
        })
        .catch((err)=>{
           setloading(false);
           console.log("there is some error",err)
        })  
    }



  return (
    <div className='mt-5'>
        {previewUrl?<ImagePreviewCard image={previewUrl} callback={removePreviewImage}/>:<></>}
        <div className='flex justify-start items-start space-x-3'>
             <UserAvatar name='Guru' image=''/>
             <textarea className='w-full h-24 text-md p-2 bg-muted outline-none rounded-lg ml-2 resize-none placeholder:font-normal'
               onChange={(e)=>{setContent(e.target.value)}} value={content}>
             </textarea>
        </div>
        <span>{}</span>
        <div className='mt-3 ml-14 flex justify-between items-center'>
            <input type='file' ref={imageRef} className='hidden'  onChange={handleImageChange}/>
            <Image height={20} width={20} className='cursor-pointer' onClick={onHandleClick}/>
            <Button disabled={content?.length<10 || loading?true:false } onClick={submit} >Post</Button>
        </div>
    </div>
  )
}
