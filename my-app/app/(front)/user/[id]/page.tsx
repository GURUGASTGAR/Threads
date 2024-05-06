
import UserProfileAvatar from '@/components/common/UserAvatar'

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {  getUserProfile } from '@/lib/serverMethods';
import { ShowUser } from '@/types';
import PostCard from '@/components/common/PostCard';
import DynamicNav from '@/components/common/DynamicNav';
import Comment from '@/components/common/Comment';


export default async function page({params}:{params:{id:number}}) {
   const user: ShowUser | null = await getUserProfile(params.id);
   console.log("page.tsx",user?.post)
  return (
    <div>
      <DynamicNav title='Profile'/>
        <div className='mt-5 flex items-center space-x-4'>
             <div className='bg-muted p-4 rounded-full'>
             <UserProfileAvatar name={user?.name ?? "U"}/>
             </div>
             <div>
              <h1 className='text-2xl font-bold'>{user?.name}</h1>
              <h1 className='text-orange-300 text-md font-mono'>@{user?.name?.split(' ')[0]}</h1>
              <h1 className='text-xl'>{user?.username}</h1>
             </div>
        </div>
        <div className=' w-full flex  mt-7 justify-center'>
        <Tabs defaultValue="account" className="w-[500px]"> 
  <TabsList>
    <TabsTrigger value="Posts">Posts</TabsTrigger>
    <TabsTrigger value="Comments">Comments</TabsTrigger>
  </TabsList>
  <TabsContent value="Posts">{user?.post && user?.post?.length < 1 ? (
  <div className='text-center w-full'>No Posts Found</div>
) : (
user?.post.map(userpost => <PostCard post={userpost} key={userpost.id} isAuthCard={true}/>)
)
}</TabsContent>
  <TabsContent value="Comments">{user?.comment&&user?.comment?.length < 1 ? (
  <div className='text-center w-full'>No Comments Found</div>
) : (
  user?.comment.map(comment => <Comment comment={comment} key={comment.id} isAuthCard={true}/>)
)
}</TabsContent>
</Tabs>

        </div>
    </div>
  )     
}
