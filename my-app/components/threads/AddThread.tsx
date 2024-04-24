/* eslint-disable jsx-a11y/alt-text */
'use client'
import React, { useState } from 'react'
import UserAvatar from '../common/UserAvatar'
import { Image } from 'lucide-react'
import { Button } from '../ui/button'
import { useRef } from 'react'  
import ImagePreviewCard from '../common/ImagePreviewCard'

export default function AddThread() {
    const imageRef = useRef<HTMLInputElement>(null)
    const [image ,setImage] = useState<File| null>(null)
    const [previewUrl, SetPreviewUrl] = useState<string | undefined>();
    const [content,setContent] = useState<string>("");


    const onHandleClick = ()=>{
        imageRef.current?.click();
    }
    

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
       const selectedFile = event.target.files?.[0]
       if(selectedFile){
        setImage(selectedFile);
        const imageUrl = URL.createObjectURL(selectedFile);
        SetPreviewUrl(imageUrl);
       }

    }
    const removePreviewImage= ()=>{
        setImage(null);
        SetPreviewUrl(undefined);
    }
  
  return (
    <div className='mt-5'>
        {previewUrl?<ImagePreviewCard image={previewUrl} callback={removePreviewImage}/>:<></>}
        <div className='flex justify-start items-start space-x-3'>
             <UserAvatar name='Guru' image=''/>
             <textarea className='w-full h-24 text-md p-2 bg-muted outline-none rounded-lg ml-2 resize-none placeholder:font-normal'
               onChange={(e)=>{setContent(e.target.value)}}>
             </textarea>
        </div>
        <div className='mt-3 ml-14 flex justify-between items-center'>
            <input type='file' ref={imageRef} className='hidden'  onChange={handleImageChange}/>
            <Image height={20} width={20} className='cursor-pointer' onClick={onHandleClick} />
            <Button disabled={content?.length<3?true:false}>Post</Button>
        </div>
    </div>
  )
}
