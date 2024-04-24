import { signupSchema } from "@/zodvalidation/registerSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import prisma from "@/app/db/dbconf";


export async function POST(request:NextRequest) {
     try {
        const data = await request.json();
        const result = signupSchema.safeParse(data)
        if(!result.success){
                const zoderror =  result.error.issues.map(issue => ({
                    path: issue.path.join('.'),
                    message: issue.message
                }));
            
           throw zoderror
        }
        const existingUsername = await prisma.user.findUnique({
            where:{
                username: data.username,
            }
        })
        if(existingUsername){
            return NextResponse.json({status: 400, error:"Username already taken"})
        }
        data.password = await bcrypt.hash(data.password,10)
        await prisma.user.create({
            data:{
                name: data.name,
                username: data.username,
                password:data.password,
            }
        })
        return NextResponse.json({status:200 , message:" Signed up succesfully"})
    } catch (error) {
        return NextResponse.json({status:400, error})
    }

}