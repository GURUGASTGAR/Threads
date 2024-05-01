import prisma from "@/app/db/dbconf";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req:NextRequest,{params}:{params:{id:number}}){
      const post = await prisma.post.findUnique({
        where:{
            id:Number(params.id)
        },
        include:{
            user:{
                select:{
                    id:true,
                    name:true,
                }
            },
            commnet:{
                include:{
                    user:{
                        select:{
                            id:true,
                            name:true
                        }
                    },
                },
                orderBy:{
                    id:"desc"
                }
            }
        },
      })

       return NextResponse.json({status:200,data:post})
}