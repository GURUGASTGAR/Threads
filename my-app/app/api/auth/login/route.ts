import prisma from "@/app/db/dbconf";
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/zodvalidation/registerSchema";




export async function POST(req:NextRequest){

 try {
    const body = await req.json();
    const result = loginSchema.safeParse(body);
    if(!result.success){
        throw "invalid credentials"
        }
    const existingUser = await prisma.user.findUnique({
        where:{
            username:body.username,
        }
    })
    if(!existingUser){
        return NextResponse.json({status: 400, error:"Invalid credentials"});
    }
    const passwordValidaton = await bcrypt.compare(body.password, existingUser?.password || '');
    if(passwordValidaton){
        return NextResponse.json({status:200,message:"user logged in succesfully"})
    }
    return NextResponse.json({status:400, error:"invalid credentials"})
 } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 400, error});
 }

}
// /////
// import prisma from "@/app/db/dbconf";
// import bcrypt from 'bcrypt'
// import zod from 'zod'
// import { NextRequest, NextResponse } from "next/server";
// import { loginSchema } from "@/zodvalidation/registerSchema";



// export async function POST(req:NextRequest){

//  try {
//     const body = await req.json();
//     const result = loginSchema.safeParse(body);
//     if(!result.success){
//         throw result.error;
//     }
//     const existingUser = await prisma.user.findUnique({
//         where:{
//             username:body.email,
//         }
//     })
//     if(!existingUser){
//         return NextResponse.json({status: 400, error:"user does not exists"});
//     }
//     const passwordValidaton = await bcrypt.compare(body.password, existingUser?.password || '');
//     if(passwordValidaton){
//         return NextResponse.json({status:200,message:"user logged in succesfully"})
//     }
//     return NextResponse.json({status:400, error:"invalid credentials"})
//  } catch (error) {
//     console.log(error)
//     if (error instanceof zod.ZodError) {
//         const issues = error.issues.map(issue => ({
//             path: issue.path.join('.'),
//             message: issue.message
//         }));
//         return NextResponse.json({ status: 400, error: issues });
//     }
//     return NextResponse.json({status:400, error: error})
//  }

// }