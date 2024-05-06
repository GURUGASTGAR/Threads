import Env from "@/config/env";
import { headers } from "next/headers";
export async function getposts(){
    try {
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
    } catch (error) {
     console.log(error); 
    }
}

export async function getUserPosts() {
  try {
    const userPosts = await fetch(`${Env.APP_URL}/api/user/post`,{
      cache:"no-cache",
      headers:headers(),
    });
   if(!userPosts.ok){
    throw new Error("failed to fetch data")
   }
   const response = await userPosts.json();
    return response.data;
  } catch (error) {
    console.log("get user post: ",error)
  }
}

export async function getUsers(){

  try {
    const users = await fetch(`${Env.APP_URL}/api/user`,{
      cache:'no-cache',
      headers:headers(),
    })
    if(!users){
      throw new Error("failed to fetch data")
    }
    const response = await users.json();
    return response?.data;
  } catch (error) {
    console.log("server methods file ,get user: ",error)
  }
}

export async function getUniquePost(id:number){
  try {
    const post =await fetch(`${Env.APP_URL}/api/post/${id}`,{
      cache:'no-cache',
      headers:headers(),
    })
    if(!post){
      throw new Error("failed to fetch data")
    }
    const response = await post.json();
    return response?.data;
  } catch (error) {
    console.log("server methods file ,get user: ",error)    
  }
}

export async function getUserComments() {
  try {
    const userComments = await fetch(`${Env.APP_URL}/api/user/comment`,{
      cache:"no-cache",
      headers:headers(),
    });
   if(!userComments.ok){
    throw new Error("failed to fetch data")
   }
   const response = await userComments.json();
    return response.data;
  } catch (error) {
    console.log("get user post: ",error)
  }
}
/// get user profile
export async function getUserProfile(id:number){

  try {
    const users = await fetch(`${Env.APP_URL}/api/user/${id}`,{
      cache:'no-cache',
      headers:headers(),
    })
    console.log(users)
    if(!users){
      throw new Error("failed to fetch data")
    }
    const response = await users.json();
    //console.log("responseis",response)
    return response?.data;
  } catch (error) {
    console.log("server methods file ,get user: ",error)
  }
}

export async function getUserNotification(){
  try {
    const userNotifications = await fetch(`${Env.APP_URL}/api/notification`,{
      cache:"no-cache",
      headers:headers()
    })

    if(!userNotifications){
      throw new Error("failed to fetch")
    }
    const response = await userNotifications.json();
    return response.data
  } catch (error) {
    console.log("notification.error",error)
  }
}
