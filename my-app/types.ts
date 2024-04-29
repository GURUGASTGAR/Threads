export interface AuthTypes {

  name?: string;
  password?: string;
  username?:string
}


export interface AuthErrorTypes {

  name?: string;
  username?: string
  password?: string;
  
}


export interface PostType {
  id:number,
  user_id:number,
  content:string,
  image?:string,
  created_at:string,
  user:PostUser,
}


export interface PostUser {
  id:number,
  name:string
}