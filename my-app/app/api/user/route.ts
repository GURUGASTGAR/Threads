import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/app/db/dbconf";


export async function GET(req:NextRequest) {
    const session:CustomSession | null = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json({status:401, message:"Un-Authorized"})
    }
    const user = await prisma.user.findMany({
        where:{
            NOT:{
                id:Number(session?.user?.id)
        }
        },
        select:{
            id:true,
            name:true,
        }
    })

    return NextResponse.json({status:200,data:user})
}