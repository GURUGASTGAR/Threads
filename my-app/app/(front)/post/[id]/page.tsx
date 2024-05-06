import Comment from '@/components/common/Comment'
import DynamicNav from '@/components/common/DynamicNav'
import PostCard from '@/components/common/PostCard'
import { getUniquePost } from '@/lib/serverMethods'
import { CommentType } from '@/types'
import React from 'react'

export default async function page({params}:{params:{id:number}}) {
    const post = await getUniquePost(params.id)
  return (
    <div>
        <DynamicNav title='Post'/>
        {post && (<div className='mt-7'><PostCard post={post} noRedirect={true}/></div>)}
        <div className='mt-3'>
          <div className='font-bold text-lg mb-5'>
             Comments
          </div>
          {post?.commnet && post.commnet?.length>0?
          (
            <div>
                {post.commnet.map((item: CommentType)=>{
            return <Comment key={item.id} comment={item} />})}
            </div>
          ):(
            <div className="text-gray-700 font-bold">No Comment Found</div>
          )}
        </div>
    </div>
  )
}

