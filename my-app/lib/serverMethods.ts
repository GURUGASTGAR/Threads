import Env from "@/config/env";
import { headers } from "next/headers";
export async function getposts(){
    const res = await fetch(`${Env.APP_URL}/api/post`,
      {
        cache:"no-cache",
        headers:headers(),
      }
    )
    if(!res.ok){
      throw new Error("failed to fetch data")
    }

    const response = await res.json();
    return response?.data;
}

export async function getUserPosts() {
  const userPosts = await fetch(`${Env.APP_URL}/api/user/post`,{
    cache:"no-cache",
    headers:headers(),
  });
 if(!userPosts.ok){
  throw new Error("failed to fetch data")
 }
 const response = await userPosts.json();
  return response.data;
}

export async function getUsers(){
  const users = await fetch(`${Env.APP_URL}/api/user`,{
    cache:'no-cache',
    headers:headers(),
  })
  const response = await users.json();
  return response?.data;
}