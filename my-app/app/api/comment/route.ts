import prisma from "@/app/db/dbconf";
import { commentSchema } from "@/zodvalidation/postSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";



export async function POST(req:NextRequest) {
    const  data = await req.json();
    const {success} = commentSchema.safeParse(data.content);
    const session:CustomSession | null = await getServerSession(authOptions);
    try {
        if(!session){
            return NextResponse.json({status:401,message:"Un-Authenticated"})
        }
        if(!success){
           return NextResponse.json({status:400,zoderror:"must be atleast 5 char long"})        
        }
        //increase the comment count
        await prisma.post.update({
            where:{
                id:Number(data.post_id)
            },
            data:{
                comment_count:{
                    increment:1
                }
            }
        })
        //add notification 
        await prisma.notification.create({
            data:{
                user_id: Number(session.user?.id),
                touser_id: Number(data.touser_id),
                content: data.content,
            }
        })
        //add comment to db
        await prisma.comment.create({
            data:{
                user_id: Number(session?.user?.id),
                post_id:Number(data.post_id),
                content: data.content
            }
        })
       return  NextResponse.json({status:200,message:"comment added succesfully"})
    } catch (error) {
     console.log(error)   
    }
}