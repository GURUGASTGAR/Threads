import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
   providers: [
    CredentialsProvider({
        name: "credentials",
        credentials: {
            username: { },
            password: { }
          },
          async authorize(credentials, req) {
            const user = { }
      
            if (user) {
       
                return user
            } else {
    
                return null
       
            }
          }
    })
   ]
}