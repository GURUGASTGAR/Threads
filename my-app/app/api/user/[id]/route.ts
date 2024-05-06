import prisma from "@/app/db/dbconf";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{id:number}}){
  const response = await prisma.user.findUnique({
    where:{
        id:Number(params.id)
    },
    select:{
        id:true,
        name:true,
        username:true,
        post:{
            include:{
                user:{
                    select:{
                        id:true,
                        name:true,
                    }
                }
            }
        },
        comment:{
            include:{
                user:{
                    select:{
                        id:true,
                        name:true,
                    }
                }
            }
        }
    }
  })

 // console.log("prisma be",response)
  return NextResponse.json({status:200,data:response})
}