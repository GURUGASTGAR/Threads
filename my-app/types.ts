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

export interface PostError{
  postcomment?:string
}

export interface PostType {
  id:number,
  user_id:number,
  content:string,
  image?:string,
  comment_count?:number,
  created_at:string,
  user:PostUser,
}


export interface PostUser {
  id:number,
  name:string
}


export interface CommentType {
  id:number,
  user_id:number,
  post_id:number,
  content:string,
  created_at:string,
  user: PostUser,
}

export interface ShowUser {
  id:number,
  name:string,
  username:string,
  post: Array<PostType> | [],
  comment: Array<CommentType> | []
}

export interface NotificationType {
  id:number,
  user_id: number,
  touser_id: number,
  content: string,
  created_at:string,
  user: PostUser,
}