import { signupSchema } from "@/zodvalidation/registerSchema";
import { NextRequest, NextResponse } from "next/server";
import zod  from "zod";
import bcrypt from 'bcrypt';
import prisma from "@/app/db/dbconf";


export async function POST(request:NextRequest) {
     try {
        const data = await request.json();
        const result = signupSchema.safeParse(data)
        if(!result.success){
          throw result.error;
        }
        const existingUser = await prisma.user.findUnique({
            where:{
                email: data.email
            }
        })
        if(existingUser){
            NextResponse.json({status: 400, error:`user with ${data.email} already exists`})
        }
        const existingUsername = await prisma.user.findUnique({
            where:{
                username: data.username
            }
        })
        if(existingUsername){
            return NextResponse.json({status: 400, error:"Username already taken"})
        }
        data.password = await bcrypt.hash(data.password,10)
        await prisma.user.create({
            data:{
                email:data.email,
                password:data.password,
                name:data.name,
                username:data.username,
                created_at: new Date()
            }
        })
        return NextResponse.json({status:200 , message:"user created succesfully"})
    } catch (error) {
        console.log(error)
        if (error instanceof zod.ZodError) {
            const issues = error.issues.map(issue => ({
                path: issue.path.join('.'),
                message: issue.message
            }));
            return NextResponse.json({ status: 400, error: issues });
        }
        return NextResponse.json({status:400, error: error})
    }

}