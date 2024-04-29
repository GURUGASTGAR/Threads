import prisma from "@/app/db/dbconf";
import { getRandomNumber } from "@/lib/utils";
import { imageValidator } from "@/zodvalidation/imageValidator";
import { postSchema } from "@/zodvalidation/postSchema";
import { writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";

interface CustomBlob extends Blob {
  name:string
}

export async function  GET(){
  const session: CustomSession | null = await getServerSession(authOptions);
  if(!session){
    return NextResponse.json({status:401, message: "Un-Authorized"})
  }
  const post = await prisma.post.findMany({
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
  return NextResponse.json({status: 200 ,data:post})
}

export async function POST(req:NextRequest) {
  const session: CustomSession | null = await getServerSession(authOptions);
  
  if(!session){
      return NextResponse.json({ status: 200, message: "Un-Autherized" });
  }

  const formData = await req.formData();
  const data = {
    content: formData.get("content"),
    image:""
  }

  const result = postSchema.safeParse(data)
        try {
            if(!result.success){
                throw "must be atleast 10 char long"
        }
        const image = formData.get('image') as CustomBlob | null
            if(image){
              const isValidImage = imageValidator(image.name, image.size)
              if(isValidImage){
                return NextResponse.json({
                  status:400,
                  error:{
                    content:isValidImage
                  }
                })
              }


              // upload an image  
              try {
                const buffer = Buffer.from(await image!.arrayBuffer());
                const uploadDir = join(process.cwd(), 'public', "/uploads")
                const uniqueName = Date.now() + "_" + getRandomNumber(1,9999);
                const imgExtension = image!.name.split(".");
                const fileName = uniqueName +"."+ imgExtension[1]
                await writeFile(`${uploadDir}/${fileName}`, buffer)
                data.image = fileName;
              } catch (error) {
                return NextResponse.json({status:500, message:"something went wrong"})
              }

              
            }
             
            //insert data into databaase
            await prisma.post.create({
              data:{
                content: result.data.content,
                user_id: Number(session?.user?.id),
                image: data.image ?? null
              }
          })
          return NextResponse.json({status:200, message:"post created succesfully"})



        } catch (error) {
          NextResponse.json({status:400,error})            
        }
}