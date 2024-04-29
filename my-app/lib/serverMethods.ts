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