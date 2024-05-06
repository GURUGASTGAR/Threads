
import Image from "next/image";
import AddThread from "@/components/threads/AddThread";
import PostCard from "@/components/common/PostCard";
import { getposts } from "@/lib/serverMethods";
import { PostType } from "@/types";




export default async function Home() {
  const posts: Array<PostType> | [] = await getposts();

  return (
   <div>
    <div className='flex justify-center items-center'>
               <Image src="/images/logo.svg" className="hidden md:block" width={40} height={40} alt='logo'/>
               </div>
               <AddThread/>
               <div className='mt-5'>
                {posts.map((post)=>(<PostCard post={post} key={post.id} isAuthCard={false}/>))}
               </div>
   </div>
  );
}
