import { CustomSession, authOptions } from '@/app/api/auth/[...nextauth]/options'
import UserProfileAvatar from '@/components/common/UserAvatar'
import { MoveLeft } from 'lucide-react'
import { getServerSession } from 'next-auth'
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserComments, getUserPosts } from '@/lib/serverMethods';
import { CommentType, PostType } from '@/types';
import PostCard from '@/components/common/PostCard';
import DynamicNav from '@/components/common/DynamicNav';
import Comment from '@/components/common/Comment';


export default async function page() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const userposts: Array<PostType>| []= await getUserPosts();
  const userComments:Array<CommentType> | [] = await getUserComments();
  return (
    <div>
      <DynamicNav title='Profile'/>
        <div className='mt-5 flex items-center space-x-4'>
             <div className='bg-muted p-4 rounded-full'>
             <UserProfileAvatar name='uru'/>
             </div>
             <div>
              <h1 className='text-2xl font-bold'>{session?.user?.name}</h1>
              <h1 className='text-orange-300 text-md font-mono'>@{session?.user?.name?.split(' ')[0]}</h1>
              <h1 className='text-xl'>{session?.user?.username}</h1>
             </div>
        </div>
        <div className=' w-full flex  mt-7 justify-center'>
        <Tabs defaultValue="account" className="w-[500px]">
  <TabsList>
    <TabsTrigger value="Posts">Posts</TabsTrigger>
    <TabsTrigger value="Comments">Comments</TabsTrigger>
  </TabsList>
  <TabsContent value="Posts">{userposts?.length < 1 ? (
  <div className='text-center w-full'>No Posts Found</div>
) : (
  userposts.map(userpost => <PostCard post={userpost} key={userpost.id} isAuthCard={true}/>)
)
}</TabsContent>
  <TabsContent value="Comments">{userComments?.length < 1 ? (
  <div className='text-center w-full'>No Comments Found</div>
) : (
  userComments.map(comment => <Comment comment={comment} key={comment.id} isAuthCard={true}/>)
)
}</TabsContent>
</Tabs>

        </div>
    </div>
  )     
}
