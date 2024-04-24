import prisma from "@/app/db/dbconf";
import { AuthOptions, ISODateString, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export interface CustomSession {
   user?:CustomUser,
   expires: ISODateString;
}

interface CustomUser {
  id?: string | null,
  name?: string | null,
  username?: string | null
}

export const authOptions: AuthOptions = {
   pages: {
    signIn:"/login"
   },
   callbacks:{
    async jwt({token,user}){
        if(user){
          token.user = user
        }
        return token;
    },
    async session ({ session,user,token}:{ session: CustomSession,token: JWT, user:User}){
          session.user = token.user as CustomUser;
          return session;
    }
   },
   providers: [
    CredentialsProvider({
        name: "credentials",
        credentials: {
            username: { },
            password: { }
          },
          async authorize(credentials, req) {
            const user = await prisma.user.findUnique({
              where:{
                username:credentials?.username
              },
              select:{
                id:true,
                name:true,
                username:true
              }
            })
      
            if (user) {
       
                return {...user,id:user.id.toString()};
            } else {
    
                return null
       
            }
          }
    })
   ]
}