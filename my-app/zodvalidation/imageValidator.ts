import { bytesToMB } from "@/lib/utils";

export function imageValidator(name:string| undefined, size: number | undefined){
  let flag : string | null = null;
  if(name){
    const getImgExtension = name.split(".");
    const imageExtensionType :Array<string> = ['svg','jpg','jpeg','gif','png'];
    if(!imageExtensionType.includes(getImgExtension[1])){
        flag = "must be an image or .gif"
    }else{
        flag = null
    }
  }

  if(size){
    const imageInMB = bytesToMB(size)
    if(imageInMB > 2){
        flag = "image must be less than 2 mb"
    }else{
        flag = null
    }
  }

  return flag;
}