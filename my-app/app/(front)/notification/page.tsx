import DynamicNav from '@/components/common/DynamicNav'
import NotifactionCard from '@/components/common/NotifactionCard';
import { getUserNotification } from '@/lib/serverMethods'
import { NotificationType } from '@/types';
import React from 'react'

export default async function page() {
  const notifications: Array<NotificationType> | [] = await getUserNotification();
  console.log(notifications);
  return (
    <div>
        <DynamicNav title='Notification'/>
       <div className='mt-5'>
        {notifications? notifications.map((notification)=>{
          return <NotifactionCard notification={notification} key={notification.id}/>
        }):<div className='text-center'>No Notifications</div>}
       </div>
    </div>
  )
}
