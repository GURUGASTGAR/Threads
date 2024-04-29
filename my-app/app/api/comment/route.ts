import prisma from "@/app/db/dbconf";
import { commentSchema } from "@/zodvalidation/postSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";



export async function POST(req:NextRequest) {
    const  data = await req.json();
    const {success} = commentSchema.safeParse(data.comment);
    const session:CustomSession | null = await getServerSession(authOptions);
    try {
        if(!session){
            return NextResponse.json({status:401,message:"Un-Authenticated"})
        }
        if(!success){
           throw new Error("Atleast 10 char")        
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
        //add comment to db
        await prisma.comment.create({
            data:{
                user_id: Number(session?.user?.id),
                post_id:Number(data.post_id),
                content: data.comment
            }
        })
        NextResponse.json({status:200,message:"comment added succesfully"})
    } catch (error) {
     console.log(error)   
    }
}