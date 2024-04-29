import React from 'react'
import { ProfileAvatar, ProfileAvatarFallback, ProfileAvatarImage } from '../ui/profileAvatar'


export default function UserProfileAvatar({name,image}:{name:string,image?:string}){
  return(
    <ProfileAvatar>
      <ProfileAvatarImage src={image}/>
      <ProfileAvatarFallback>{name[0]}</ProfileAvatarFallback>
    </ProfileAvatar>

  )
}