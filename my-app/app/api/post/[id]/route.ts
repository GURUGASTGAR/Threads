import prisma from "@/app/db/dbconf";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../../auth/[...nextauth]/options";
import { join } from "path";
import fs from "fs";



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


/// delete post
export async function DELETE(req:NextRequest, {params}:{params:{id:number}}) {
  const sessoin: CustomSession | null = await getServerSession(authOptions);
if(!sessoin){
    return NextResponse.json({status:401, message:"Un-Authorized"})
}

 const findpost = await prisma.post.findFirst({
    where:{
        id:Number(params.id),
        user_id:Number(sessoin?.user?.id)
    }
 })

 if(!findpost){
    return NextResponse.json({status:400, message:"bad request"})
 }

 // * remove image 

//  if(findpost.image != "" || findpost.image != null || findpost.image !=undefined){
//        const dir = join(process.cwd(),"public","uploads")
//        const imagePath = join(dir,findpost.image)
//        rmSync(imagePath,{force:true})
//  }
if (findpost.image !== null && findpost.image !== "") { // Check if the image path exists and is not empty
    const dir = join(process.cwd(), "public", "uploads");
    const imagePath = join(dir, findpost.image); // Construct the full path to the image file

    // Check if the file exists before attempting to delete it
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete the image file synchronously
        console.log(`Deleted image file: ${imagePath}`);
    } else {
        console.log(`Image file not found at path: ${imagePath}`);
    }
}
    
 await prisma.post.delete({
    where:{
        id:Number(params.id)
    }
 })

 return NextResponse.json({status:200, message: "Post Deleted"})

}