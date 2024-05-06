

import prisma from "@/app/db/dbconf";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../../auth/[...nextauth]/options";
/// delete comment
export async function DELETE(req:NextRequest, {params}:{params:{id:number}}) {
    const sessoin: CustomSession | null = await getServerSession(authOptions);
  if(!sessoin){
      return NextResponse.json({status:401, message:"Un-Authorized"})
  }
  
   const findComment = await prisma.comment.findFirst({
      where:{
          id:Number(params.id),
          user_id:Number(sessoin?.user?.id)
      }
   })
  
   if(!findComment){
      return NextResponse.json({status:400, message:"bad request"})
   }
      
   await prisma.comment.delete({
      where:{
          id:Number(params.id)
      }
   })
  
   return NextResponse.json({status:200, message: "comment Deleted"})
  
  }