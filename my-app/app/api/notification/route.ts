import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/app/db/dbconf";



export async function GET(req:NextRequest){
   const session: CustomSession | null = await getServerSession(authOptions);
   if(!session){
    return NextResponse.json({status:400,message:"Un-Authenticated"})
   }
   const notification = await prisma.notification.findMany({
    where:{
        touser_id:Number(session?.user?.id)
    },
    include:{
        user:{
            select:{
                id:true,
                name:true,
            }
        }
    },
    orderBy:{
        id:"desc"
    }
   })

   return NextResponse.json({status:200,data:notification})
}